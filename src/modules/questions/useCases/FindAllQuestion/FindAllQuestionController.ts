import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindAllQuestionUseCase } from './FindAllQuestionUseCase';

class FindAllQuestionController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { page, pageSize } = request.query;

    const findAllQuestion = container.resolve(FindAllQuestionUseCase);

    const questions = await findAllQuestion.execute({
      page: Number(page),
      pageSize: Number(pageSize),
    });

    return response.json(classToPlain(questions));
  }
}

export { FindAllQuestionController };
