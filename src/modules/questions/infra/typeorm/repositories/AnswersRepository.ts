import { getRepository, Repository } from 'typeorm';

import { IAnswersRepository } from '@modules/questions/repositories/IAnswersRepository';
import { ICreateAnswerDTO } from '@modules/questions/dtos/ICreateAnswerDTO';
import { IFindOneAnswerDTO } from '@modules/questions/dtos/IFindOneAnswerDTO';
import { IFindAllAnswersDTO } from '../../../dtos/IFindAllAnswersDTO';

import { Answer } from '../entities/Answer';

class AnswersRepository implements IAnswersRepository {
  private ormRepository: Repository<Answer>;

  constructor() {
    this.ormRepository = getRepository(Answer);
  }

  public async create(data: ICreateAnswerDTO): Promise<Answer> {
    const answer = this.ormRepository.create(data);

    await this.ormRepository.save(answer);

    return answer;
  }

  public async findAll({
    filters,
    page = 1,
    pageSize = 5,
    relations = [],
  }: IFindAllAnswersDTO): Promise<Answer[]> {
    const answers = this.ormRepository.find({
      where: filters,
      relations,
      take: pageSize,
      skip: pageSize * (page - 1),
      order: { createdAt: 'DESC' },
    });

    return answers;
  }

  public async findOne({
    id,
    questionId,
  }: IFindOneAnswerDTO): Promise<Answer | undefined> {
    return this.ormRepository.findOne({ id, questionId });
  }

  public async delete(answerToDelete: Answer): Promise<boolean> {
    const response = await this.ormRepository.remove(answerToDelete);

    return !!response;
  }
}

export { AnswersRepository };
