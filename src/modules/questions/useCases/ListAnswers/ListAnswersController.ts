import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAnswersUseCase } from './ListAnswersUseCase';

class ListAnswersController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { page, pageSize, status } = request.query;
    const { id: questionId } = request.params;
    const userId = request.user?.id;

    const listAnswers = container.resolve(ListAnswersUseCase);

    const answers = await listAnswers.execute({
      questionId,
      page: Number(page),
      pageSize: Number(pageSize),
      status: Number(status),
      userId,
    });

    return response.json(classToPlain(answers));
  }
}

export { ListAnswersController };
