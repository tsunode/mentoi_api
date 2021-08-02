import { AppError } from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import { IQuestionsRepository } from '@modules/questions/repositories/IQuestionsRepository';
import { IAnswersRepository } from '@modules/questions/repositories/IAnswersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import ANSWERS_EVALUATIONS from '@modules/questions/constants/AnswersEvaluations';
import { IAnswersEvaluationsRepository } from '@modules/questions/repositories/IEvaluationsAnswersRepository';
import { AnswerEvaluation } from '@modules/questions/infra/typeorm/entities/AnswerEvaluation';

interface IRequest {
  answerId: string;
  questionId: string;
  userId: string;
  type: ANSWERS_EVALUATIONS;
}

@injectable()
class EvaluateAnswerUseCase {
  constructor(
    @inject('QuestionsRepository')
    private questionsRepository: IQuestionsRepository,

    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('AnswersEvaluationsRepository')
    private answersEvaluationsRepository: IAnswersEvaluationsRepository,
  ) {}

  public async execute({
    answerId,
    questionId,
    userId,
    type,
  }: IRequest): Promise<AnswerEvaluation> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const question = await this.questionsRepository.findById({
      id: questionId,
    });

    if (!question) {
      throw new AppError('Question not found', 404);
    }

    const answer = await this.answersRepository.findOne({
      id: answerId,
      questionId,
    });

    if (!answer) {
      throw new AppError('Answer not exists in this question', 404);
    }

    const answerEvaluation = await this.answersEvaluationsRepository.findOne({
      userId,
      answerId,
    });

    if (answerEvaluation) {
      answerEvaluation.type = type;
      return this.answersEvaluationsRepository.save(answerEvaluation);
    }

    return this.answersEvaluationsRepository.create({
      userId,
      answerId,
      type,
    });
  }
}

export { EvaluateAnswerUseCase };
