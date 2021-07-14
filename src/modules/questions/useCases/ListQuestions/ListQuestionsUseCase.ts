import { injectable, inject } from 'tsyringe';

import { Question } from '@modules/questions/infra/typeorm/entities/Question';
import { IQuestionsRepository } from '@modules/questions/repositories/IQuestionsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  page: number;
  pageSize: number;
  areaInterest?: string;
  q?: string;
  userId?: string;
  userIdFilter?: string;
}

@injectable()
class ListQuestionsUseCase {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    page,
    pageSize,
    q,
    areaInterest,
    userId,
    userIdFilter,
  }: IRequest): Promise<Question[] | undefined> {
    let areasInterest;

    if (areaInterest === 'me' && userId) {
      const user = await this.usersRepository.findById(userId);

      if (!user) {
        throw new AppError('User not found', 404);
      }

      areasInterest = user.areasInterest.map(areaInterest => areaInterest.name);
    }

    const questions = await this.questionsRepository.findAll({
      page,
      pageSize,
      relations: ['files', 'areasInterest', 'user'],
      filters: {
        q,
        areasInterest: areasInterest || areaInterest,
        userId: userIdFilter,
      },
    });

    return questions;
  }
}

export { ListQuestionsUseCase };
