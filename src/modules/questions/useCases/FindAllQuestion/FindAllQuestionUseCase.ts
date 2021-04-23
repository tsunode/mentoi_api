import { injectable, inject } from 'tsyringe';

import { Question } from '@modules/questions/infra/typeorm/entities/Question';
import { IQuestionsRepository } from '@modules/questions/repositories/IQuestionsRepository';

interface IRequest {
  page: number;
  pageSize: number;
}

@injectable()
class FindAllQuestionUseCase {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,
  ) {}

  public async execute({
    page,
    pageSize,
  }: IRequest): Promise<Question[] | undefined> {
    const questions = await this.questionsRepository.findAll({
      page,
      pageSize,
      relations: ['files', 'areasInterest', 'user'],
    });

    return questions;
  }
}

export { FindAllQuestionUseCase };
