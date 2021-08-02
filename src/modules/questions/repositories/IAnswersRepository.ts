import { IFindAllAnswersDTO } from '../dtos/IFindAllAnswersDTO';
import { ICreateAnswerDTO } from '../dtos/ICreateAnswerDTO';
import { Answer } from '../infra/typeorm/entities/Answer';
import { IFindOneAnswerDTO } from '../dtos/IFindOneAnswerDTO';

export interface IBestAnswerEvaluation {
  answerId: string;
  total: number;
}

export interface IAnswersRepository {
  create(data: ICreateAnswerDTO): Promise<Answer>;
  save(answer: Answer): Promise<Answer>;
  findAll(options: IFindAllAnswersDTO): Promise<Answer[]>;
  findOne(options: IFindOneAnswerDTO): Promise<Answer | undefined>;
  findBestEvaluation(
    questionId: string,
  ): Promise<IBestAnswerEvaluation | undefined>;
  delete(data: Answer): Promise<boolean>;
}
