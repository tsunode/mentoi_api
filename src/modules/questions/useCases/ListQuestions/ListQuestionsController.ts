import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListQuestionsUseCase } from './ListQuestionsUseCase';

class ListQuestionsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const {
      page,
      pageSize,
      areaInterest,
      q,
      userId: userIdFilter,
    } = request.query;

    const userId =
      areaInterest === 'me' && request.user ? request.user.id : undefined;

    const listQuestion = container.resolve(ListQuestionsUseCase);

    const questions = await listQuestion.execute({
      page: Number(page),
      pageSize: Number(pageSize),
      areaInterest: areaInterest as string,
      q: q as string,
      userId,
      userIdFilter: userIdFilter as string,
    });

    return response.json(classToPlain(questions));
  }
}

export { ListQuestionsController };
