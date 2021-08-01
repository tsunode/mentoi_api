import { IFindAllQuestionsDTO } from '../dtos/IFindAllQuestionsDTO';
import { ICreateQuestionDTO } from '../dtos/ICreateQuestionDTO';
import { Question } from '../infra/typeorm/entities/Question';
import { IFindByIdQuestionsDTO } from '../dtos/IFindByIdQuestionsDTO';

export interface IQuestionsRepository {
  create(data: ICreateQuestionDTO): Promise<Question>;
  save(question: Question): Promise<Question>;
  findAll(filters: IFindAllQuestionsDTO): Promise<Question[]>;
  findById(filters: IFindByIdQuestionsDTO): Promise<Question | undefined>;
  delete(data: Question): Promise<boolean>;
}
