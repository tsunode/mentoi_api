import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { EvaluateAnswerUseCase } from './EvaluateAnswerUseCase';

class EvaluateAnswerController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { type } = request.body;
    const { id: questionId, answerId } = request.params;
    const { id: userId } = request.user;

    const evaluateAnswer = container.resolve(EvaluateAnswerUseCase);

    const evaluate = await evaluateAnswer.execute({
      questionId,
      answerId,
      userId,
      type,
    });

    return response.json(classToPlain(evaluate));
  }
}

export { EvaluateAnswerController };
