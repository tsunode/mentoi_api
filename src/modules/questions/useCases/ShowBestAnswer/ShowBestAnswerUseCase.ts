import { AppError } from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import { IQuestionsRepository } from '@modules/questions/repositories/IQuestionsRepository';
import { IAnswersRepository } from '@modules/questions/repositories/IAnswersRepository';
import { Answer } from '@modules/questions/infra/typeorm/entities/Answer';

interface IRequest {
  questionId: string;
}

@injectable()
class ShowBestAnswerUseCase {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,

    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository,
  ) {}

  public async execute({ questionId }: IRequest): Promise<Answer | undefined> {
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
      return this.answersRepository.findOne({
        questionId,
        id: bestAnswer.answerId,
        relations: ['user'],
      });
    }

    return undefined;
  }
}

export { ShowBestAnswerUseCase };
