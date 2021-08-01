import { injectable, inject } from 'tsyringe';

import { IQuestionsRepository } from '@modules/questions/repositories/IQuestionsRepository';
import { AppError } from '@shared/errors/AppError';
import { Answer } from '@modules/questions/infra/typeorm/entities/Answer';
import { IAnswersRepository } from '@modules/questions/repositories/IAnswersRepository';
import GLOBAL_STATUS from '@shared/constants/GlobalStatus';

interface IRequest {
  questionId: string;
  page: number;
  pageSize: number;
  status: GLOBAL_STATUS;
}

@injectable()
class ListAnswersUseCase {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,

    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository,
  ) {}

  public async execute({
    questionId,
    page,
    pageSize,
    status,
  }: IRequest): Promise<Answer[] | undefined> {
    const question = await this.questionsRepository.findById({
      id: questionId,
    });

    if (!question) {
      throw new AppError('Question not found', 404);
    }

    const answers = await this.answersRepository.findAll({
      filters: {
        questionId,
        status,
      },
      page,
      pageSize,
      relations: ['user'],
    });

    return answers;
  }
}

export { ListAnswersUseCase };
