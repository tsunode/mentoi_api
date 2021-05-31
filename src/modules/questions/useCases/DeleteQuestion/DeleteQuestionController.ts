import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteQuestionUseCase } from './DeleteQuestionUseCase';

class DeleteQuestionController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id: userId, role: userRole } = request.user;

    const deleteQuestion = container.resolve(DeleteQuestionUseCase);

    const question = await deleteQuestion.execute({
      id,
      userId,
      userRole,
    });

    return response.json(classToPlain(question));
  }
}

export { DeleteQuestionController };
