import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateAnswerUseCase } from './CreateAnswerUseCase';

class CreateAnswerController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { text } = request.body;
    const { id: questionId } = request.params;
    const { id: userId } = request.user;

    const createAnswer = container.resolve(CreateAnswerUseCase);

    const answer = await createAnswer.execute({
      questionId,
      text,
      userId,
    });

    return response.json(answer);
  }
}

export { CreateAnswerController };
