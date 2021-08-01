import { injectable, inject } from 'tsyringe';

import { IQuestionsRepository } from '@modules/questions/repositories/IQuestionsRepository';
import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IAnswersRepository } from '@modules/questions/repositories/IAnswersRepository';
import { ISolicitationRepository } from '@modules/users/repositories/ISolicitationsRepository';
import { SOLICITATION_TYPE } from '@modules/users/constants/SolicitationType';
import { Solicitation } from '@modules/users/infra/typeorm/entities/Solicitation';
import USER_PERMISSION from '@modules/users/constants/UserPermission';
import GLOBAL_STATUS from '@shared/constants/GlobalStatus';

interface IRequest {
  questionId: string;
  answerId: string;
  userId: string;
  observation: string;
}

@injectable()
class ComplaintQuestionUseCase {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository,

    @inject('SolicitationsRepository')
    private solicitationRepository: ISolicitationRepository,
  ) {}

  public async execute({
    answerId,
    questionId,
    userId,
    observation,
  }: IRequest): Promise<Solicitation> {
    let user;

    if (userId) {
      user = await this.usersRepository.findById(userId);
    }

    const question = await this.questionsRepository.findById({
      id: questionId,
    });

    if (!question) {
      throw new AppError('Question not found', 404);
    }

    let answer;
    if (answerId) {
      answer = await this.answersRepository.findOne({
        id: answerId,
        questionId,
      });
    }

    if (
      user &&
      [USER_PERMISSION.ADMIN, USER_PERMISSION.MENTOI].includes(user.permission)
    ) {
      if (answer) {
        answer.status = GLOBAL_STATUS.INACTIVE;
        await this.answersRepository.save(answer);
      } else {
        question.status = GLOBAL_STATUS.INACTIVE;

        await this.questionsRepository.save(question);
      }
    }

    const observationComplet = answer
      ? `Reclamação para resposta de id:${answerId} da questão de id:${questionId} \n\n ${observation}`
      : `Reclamação para questão de id:${questionId} \n\n ${observation}`;

    const solicitation = await this.solicitationRepository.create({
      type: SOLICITATION_TYPE.COMPLAINT,
      observation: observationComplet,
      user,
    });

    return solicitation;
  }
}

export { ComplaintQuestionUseCase };
