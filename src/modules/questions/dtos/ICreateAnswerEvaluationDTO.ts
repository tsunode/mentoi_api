import ANSWERS_EVALUATIONS from '../constants/AnswersEvaluations';

export interface ICreateAnswerEvaluationDTO {
  answerId: string;
  userId: string;
  type: ANSWERS_EVALUATIONS;
}
