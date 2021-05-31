import { getRepository, Repository } from 'typeorm';

import { IQuestionsRepository } from '@modules/questions/repositories/IQuestionsRepository';
import { IFindByIdQuestionsDTO } from '../../../dtos/IFindByIdQuestionsDTO';
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
      order: { createdAt: 'DESC' },
    });

    return questions;
  }

  public async findById({
    id,
    relations = [],
  }: IFindByIdQuestionsDTO): Promise<Question | undefined> {
    const question = this.ormRepository.findOne({
      where: { id },
      relations,
    });

    return question;
  }

  public async delete(questionToDelete: Question): Promise<boolean> {
    const question = await this.ormRepository.remove(questionToDelete);

    return !!question;
  }
}

export { QuestionsRepository };
