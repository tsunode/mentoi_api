import { ICreateAnswerEvaluationDTO } from '../dtos/ICreateAnswerEvaluationDTO';
import { IFindOneAnswersEvaluations } from '../dtos/IFindOneAnswersEvaluations';
import { AnswerEvaluation } from '../infra/typeorm/entities/AnswerEvaluation';

export interface IAnswersEvaluationsRepository {
  findOne(
    data: IFindOneAnswersEvaluations,
  ): Promise<AnswerEvaluation | undefined>;
  create(data: ICreateAnswerEvaluationDTO): Promise<AnswerEvaluation>;
  save(data: AnswerEvaluation): Promise<AnswerEvaluation>;
}
