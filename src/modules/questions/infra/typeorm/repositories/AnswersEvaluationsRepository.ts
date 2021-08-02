import { getRepository, Repository } from 'typeorm';

import { IAnswersEvaluationsRepository } from '@modules/questions/repositories/IEvaluationsAnswersRepository';
import { ICreateAnswerEvaluationDTO } from '@modules/questions/dtos/ICreateAnswerEvaluationDTO';
import { IFindOneAnswersEvaluations } from '@modules/questions/dtos/IFindOneAnswersEvaluations';

import { AnswerEvaluation } from '../entities/AnswerEvaluation';

class AnswersEvaluationsRepository implements IAnswersEvaluationsRepository {
  private ormRepository: Repository<AnswerEvaluation>;

  constructor() {
    this.ormRepository = getRepository(AnswerEvaluation);
  }

  public create(data: ICreateAnswerEvaluationDTO): Promise<AnswerEvaluation> {
    const answerEvaluation = this.ormRepository.create(data);

    return this.save(answerEvaluation);
  }

  public save(answerEvaluation: AnswerEvaluation): Promise<AnswerEvaluation> {
    return this.ormRepository.save(answerEvaluation);
  }

  public async findOne({
    userId,
    answerId,
  }: IFindOneAnswersEvaluations): Promise<AnswerEvaluation | undefined> {
    return this.ormRepository.findOne({ userId, answerId });
  }
}

export { AnswersEvaluationsRepository };
