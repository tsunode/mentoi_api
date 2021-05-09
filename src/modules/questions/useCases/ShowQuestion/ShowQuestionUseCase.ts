import { injectable, inject } from 'tsyringe';

import { Question } from '@modules/questions/infra/typeorm/entities/Question';
import { IQuestionsRepository } from '@modules/questions/repositories/IQuestionsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class ShowQuestionUseCase {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
  ) {}

  public async execute(id: string): Promise<Question> {
    const question = await this.questionsRepository.findById({
      id,
      relations: ['files', 'areasInterest', 'user'],
    });

    if (!question) {
      throw new AppError('Question not found', 404);
    }

    return question;
  }
}

export { ShowQuestionUseCase };
