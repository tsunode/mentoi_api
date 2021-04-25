import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowQuestionUseCase } from './ShowQuestionUseCase';

class ShowQuestionController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showQuestion = container.resolve(ShowQuestionUseCase);

    const question = await showQuestion.execute(id);

    return response.json(classToPlain(question));
  }
}

export { ShowQuestionController };
