import { getRepository, Repository } from 'typeorm';

import { IQuestionsRepository } from '@modules/questions/repositories/IQuestionsRepository';
import { IFindAllQuestionsDTO } from '../../../dtos/IFindAllQuestionsDTO';
import { ICreateQuestionDTO } from '../../../dtos/ICreateQuestionDTO';
import { Question } from '../entities/Question';

class QuestionsRepository implements IQuestionsRepository {
  private ormRepository: Repository<Question>;

  constructor() {
    this.ormRepository = getRepository(Question);
  }

  public async create(data: ICreateQuestionDTO): Promise<Question> {
    const question = this.ormRepository.create(data);

    await this.ormRepository.save(question);

    return question;
  }

  public async findAll({
    page = 1,
    pageSize = 5,
    relations = [],
  }: IFindAllQuestionsDTO): Promise<Question[]> {
    const questions = this.ormRepository.find({
      relations,
      take: pageSize,
      skip: pageSize * (page - 1),
    });

    return questions;
  }
}

export { QuestionsRepository };
