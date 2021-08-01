import { Brackets, getRepository, ObjectLiteral, Repository } from 'typeorm';

import { IQuestionsRepository } from '@modules/questions/repositories/IQuestionsRepository';
import GLOBAL_STATUS from '@shared/constants/GlobalStatus';
import { IFindByIdQuestionsDTO } from '../../../dtos/IFindByIdQuestionsDTO';
import { IFindAllQuestionsDTO } from '../../../dtos/IFindAllQuestionsDTO';
import { ICreateQuestionDTO } from '../../../dtos/ICreateQuestionDTO';
import { Question } from '../entities/Question';

class QuestionsRepository implements IQuestionsRepository {
  private ormRepository: Repository<Question>;

  constructor() {
    this.ormRepository = getRepository(Question);
  }

  public create(data: ICreateQuestionDTO): Promise<Question> {
    const question = this.ormRepository.create(data);

    return this.save(question);
  }

  public save(question: Question): Promise<Question> {
    return this.ormRepository.save(question);
  }

  public async findAll({
    page = 1,
    pageSize = 5,
    relations = [],
    filters,
  }: IFindAllQuestionsDTO): Promise<Question[]> {
    const { q, areasInterest, status } = filters;

    let join;
    let where;

    if (areasInterest || q) {
      join = {
        alias: 'questions',
        innerJoin: { areasInterest: 'questions.areasInterest' },
      };

      where = (qb: ObjectLiteral) => {
        if (typeof areasInterest === 'string') {
          qb.where('areasInterest.name ilike :areaInterest', {
            areaInterest: `%${areasInterest}%`,
          });
        }

        if (typeof areasInterest === 'object') {
          qb.where('areasInterest.name in (:...areasInterest)', {
            areasInterest,
          });
        }

        if (q) {
          qb[areasInterest ? 'andWhere' : 'where'](
            new Brackets(sqb => {
              sqb.where('description ilike :q', { q: `%${q}%` });
              sqb.orWhere('title ilike :q', { q: `%${q}%` });
            }),
          );
        }

        if ([GLOBAL_STATUS.ACTIVE, GLOBAL_STATUS.INACTIVE].includes(status)) {
          qb.andWhere('status = :status', {
            status,
          });
        }
      };
    } else {
      where = Object.keys(filters).reduce((prev, current) => {
        return filters[current] || filters[current] === 0
          ? { ...prev, [current]: filters[current] }
          : prev;
      }, {});
    }

    const questions = this.ormRepository.find({
      join,
      where,
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
