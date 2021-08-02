import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowBestAnswerUseCase } from './ShowBestAnswerUseCase';

class ShowBestAnswerController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: questionId } = request.params;

    const showBestAnswer = container.resolve(ShowBestAnswerUseCase);

    const answer = await showBestAnswer.execute({
      questionId,
    });

    return response.json(classToPlain(answer));
  }
}

export { ShowBestAnswerController };
