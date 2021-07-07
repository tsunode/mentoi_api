import { IFindAllAnswersDTO } from '../dtos/IFindAllAnswersDTO';
import { ICreateAnswerDTO } from '../dtos/ICreateAnswerDTO';
import { Answer } from '../infra/typeorm/entities/Answer';
import { IFindOneAnswerDTO } from '../dtos/IFindOneAnswerDTO';

export interface IAnswersRepository {
  create(data: ICreateAnswerDTO): Promise<Answer>;
  findAll(options: IFindAllAnswersDTO): Promise<Answer[]>;
  findOne(options: IFindOneAnswerDTO): Promise<Answer | undefined>;
  delete(data: Answer): Promise<boolean>;
}
