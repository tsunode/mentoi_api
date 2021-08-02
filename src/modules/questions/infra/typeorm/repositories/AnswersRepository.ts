import { getRepository, Repository } from 'typeorm';

import {
  IAnswersRepository,
  IBestAnswerEvaluation,
} from '@modules/questions/repositories/IAnswersRepository';
import { ICreateAnswerDTO } from '@modules/questions/dtos/ICreateAnswerDTO';
import { IFindOneAnswerDTO } from '@modules/questions/dtos/IFindOneAnswerDTO';
import ANSWERS_EVALUATIONS from '@modules/questions/constants/AnswersEvaluations';
import { IFindAllAnswersDTO } from '../../../dtos/IFindAllAnswersDTO';

import { Answer } from '../entities/Answer';

class AnswersRepository implements IAnswersRepository {
  private ormRepository: Repository<Answer>;

  constructor() {
    this.ormRepository = getRepository(Answer);
  }

  public create(data: ICreateAnswerDTO): Promise<Answer> {
    const answer = this.ormRepository.create(data);

    return this.save(answer);
  }

  public save(answer: Answer): Promise<Answer> {
    return this.ormRepository.save(answer);
  }

  public async findAll({
    filters,
    page = 1,
    pageSize = 5,
  }: IFindAllAnswersDTO): Promise<Answer[]> {
    const { userId, questionId, status } = filters;

    const query = this.ormRepository.createQueryBuilder('answers');

    if (userId) {
      query.leftJoinAndSelect(
        'answers.evaluations',
        'evaluations',
        `evaluations.user_id = :userId`,
        { userId },
      );
    }

    return query
      .leftJoinAndSelect('answers.user', 'users')
      .where('answers.question_id = :questionId', { questionId })
      .andWhere('answers.status = :status', { status })
      .orderBy('answers.created_at', 'DESC')
      .limit(pageSize)
      .offset(pageSize * (page - 1))
      .getMany();
  }

  public async findOne({
    id,
    questionId,
    relations,
  }: IFindOneAnswerDTO): Promise<Answer | undefined> {
    return this.ormRepository.findOne({ where: { id, questionId }, relations });
  }

  public async findBestEvaluation(
    questionId: string,
  ): Promise<IBestAnswerEvaluation | undefined> {
    return this.ormRepository
      .createQueryBuilder('answers')
      .select('answers.id', 'answerId')
      .addSelect('COUNT(answers.id)', 'total')
      .leftJoin('answers.evaluations', 'evaluations')
      .where('answers.question_id = :questionId', { questionId })
      .andWhere('evaluations.type IN(:...type)', {
        type: [ANSWERS_EVALUATIONS.PERFECT, ANSWERS_EVALUATIONS.GOOD],
      })
      .addGroupBy('answers.question_id')
      .addGroupBy('answers.id')
      .orderBy('total', 'DESC')
      .getRawOne<IBestAnswerEvaluation>();
  }

  public async delete(answerToDelete: Answer): Promise<boolean> {
    const response = await this.ormRepository.remove(answerToDelete);

    return !!response;
  }
}

export { AnswersRepository };
