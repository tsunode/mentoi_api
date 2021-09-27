import { injectable, inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { USER_PERMISSION } from '@modules/users/constants/UserPermission';
import { IAnswersRepository } from '@modules/questions/repositories/IAnswersRepository';

interface IRequest {
  questionId: string;
  answerId: string;
  userId: string;
  userRole: string;
}

@injectable()
class DeleteAnswerUseCase {
  constructor(
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository,
  ) {}

  public async execute({
    questionId,
    answerId,
    userId,
    userRole,
  }: IRequest): Promise<boolean> {
    const answer = await this.answersRepository.findOne({
      id: answerId,
      questionId,
    });

    if (!answer) {
      throw new AppError('Answer not exists in this question', 404);
    }

    if (answer.userId !== userId && userRole !== USER_PERMISSION.ADMIN) {
      throw new AppError('You dont have permission to delete this answer');
    }

    return this.answersRepository.delete(answer);
  }
}

export { DeleteAnswerUseCase };
