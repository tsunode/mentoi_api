import { AppError } from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import { IQuestionsRepository } from '@modules/questions/repositories/IQuestionsRepository';
import { IAnswersRepository } from '@modules/questions/repositories/IAnswersRepository';
import { Answer } from '@modules/questions/infra/typeorm/entities/Answer';
import GLOBAL_STATUS from '@shared/constants/GlobalStatus';

interface IRequest {
  questionId: string;
  userId: string;
}

@injectable()
class ShowBestAnswerUseCase {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,

    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository,
  ) {}

  public async execute({
    questionId,
    userId,
  }: IRequest): Promise<Answer | undefined> {
    const question = await this.questionsRepository.findById({
      id: questionId,
    });

    if (!question) {
      throw new AppError('Question not found', 404);
    }

    const bestAnswer = await this.answersRepository.findBestEvaluation(
      questionId,
    );

    if (bestAnswer && bestAnswer.total) {
      const answers = await this.answersRepository.findAll({
        filters: {
          questionId,
          answerId: bestAnswer.answerId,
          status: GLOBAL_STATUS.ACTIVE,
          userId,
        },
        relations: ['user'],
        page: 1,
        pageSize: 1,
      });

      return answers[0];
    }

    return undefined;
  }
}

export { ShowBestAnswerUseCase };
