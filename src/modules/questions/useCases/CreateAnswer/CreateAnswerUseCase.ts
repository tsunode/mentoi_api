import { INotificationsRepository } from '@modules/notifications/repositories/INotificationsRepository';
import { AppError } from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import { IQuestionsRepository } from '@modules/questions/repositories/IQuestionsRepository';
import { IAnswersRepository } from '@modules/questions/repositories/IAnswersRepository';
import { Answer } from '@modules/questions/infra/typeorm/entities/Answer';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { USER_PERMISSION } from '@modules/users/constants/UserPermission';
import { NOTIFICATION_TYPE } from '@modules/notifications/constants/NotificationType';
import { IPushNotificationProvider } from '../../../../shared/container/providers/PushNotificationProvider/models/IPushNotificationProvider';

interface IRequest {
  text: string;
  questionId: string;
  userId: string;
}

@injectable()
class CreateAnswerUseCase {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,

    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('PushNotificationProvider')
    private pushNotificationProvider: IPushNotificationProvider,
  ) {}

  public async execute({
    text,
    questionId,
    userId,
  }: IRequest): Promise<Answer> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (
      ![USER_PERMISSION.MENTOI, USER_PERMISSION.ADMIN].includes(user.permission)
    ) {
      throw new AppError(`You don't have access to this action`, 403);
    }

    const question = await this.questionsRepository.findById({
      id: questionId,
    });

    if (!question) {
      throw new AppError('Question not found', 404);
    }

    const answer = await this.answersRepository.create({
      text,
      questionId,
      userId,
    });

    const notificationContent = `Sua pergunta foi respondida por ${user.nickName}`;
    const notificationUrl = `/questions/${question.id}`;

    await this.notificationsRepository.create({
      type: NOTIFICATION_TYPE.ANSWER,
      data: answer,
      content: notificationContent,
      url: notificationUrl,
      userId: question.userId,
    });

    this.pushNotificationProvider
      .createNotification({
        text: notificationContent,
        userIds: [question.userId],
        url: notificationUrl,
      })
      .catch(error => console.error(error));

    return answer;
  }
}

export { CreateAnswerUseCase };
