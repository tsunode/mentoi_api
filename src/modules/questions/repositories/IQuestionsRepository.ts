import { ICreateQuestionDTO } from '../dtos/ICreateQuestionDTO';
import { Question } from '../infra/typeorm/entities/Question';

export interface IQuestionsRepository {
  create(data: ICreateQuestionDTO): Promise<Question>;
}