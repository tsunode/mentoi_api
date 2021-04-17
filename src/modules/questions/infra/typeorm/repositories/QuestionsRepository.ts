import { getRepository, Repository } from 'typeorm';

import { IQuestionsRepository } from '@modules/questions/repositories/IQuestionsRepository';
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
}

export { QuestionsRepository };
