import { AppError } from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import { IQuestionsRepository } from '@modules/questions/repositories/IQuestionsRepository';
import { IAnswersRepository } from '@modules/questions/repositories/IAnswersRepository';
import { Answer } from '@modules/questions/infra/typeorm/entities/Answer';

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
  ) {}

  public async execute({
    text,
    questionId,
    userId,
  }: IRequest): Promise<Answer> {
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

    return answer;
  }
}

export { CreateAnswerUseCase };
