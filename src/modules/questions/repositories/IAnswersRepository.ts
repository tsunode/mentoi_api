import { IFindAllAnswersDTO } from '../dtos/IFindAllAnswersDTO';
import { ICreateAnswerDTO } from '../dtos/ICreateAnswerDTO';
import { Answer } from '../infra/typeorm/entities/Answer';

export interface IAnswersRepository {
  create(data: ICreateAnswerDTO): Promise<Answer>;
  findAll(options: IFindAllAnswersDTO): Promise<Answer[]>;
}
