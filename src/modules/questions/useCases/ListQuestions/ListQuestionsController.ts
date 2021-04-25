import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListQuestionsUseCase } from './ListQuestionsUseCase';

class ListQuestionsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { page, pageSize } = request.query;

    const listQuestion = container.resolve(ListQuestionsUseCase);

    const questions = await listQuestion.execute({
      page: Number(page),
      pageSize: Number(pageSize),
    });

    return response.json(classToPlain(questions));
  }
}

export { ListQuestionsController };
