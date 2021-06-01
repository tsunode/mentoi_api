import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListQuestionsUseCase } from './ListQuestionsUseCase';

class ListQuestionsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { page, pageSize, areaInterest, q, userId } = request.query;

    const listQuestion = container.resolve(ListQuestionsUseCase);

    const questions = await listQuestion.execute({
      page: Number(page),
      pageSize: Number(pageSize),
      areaInterest: areaInterest as string,
      q: q as string,
      userId: userId as string,
    });

    return response.json(classToPlain(questions));
  }
}

export { ListQuestionsController };
