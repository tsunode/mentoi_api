import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteAnswerUseCase } from './DeleteAnswerUseCase';

class DeleteAnswerController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: questionId, answerId } = request.params;
    const { id: userId, role: userRole } = request.user;

    const deleteAnswer = container.resolve(DeleteAnswerUseCase);

    const question = await deleteAnswer.execute({
      questionId,
      answerId,
      userId,
      userRole,
    });

    return response.json(classToPlain(question));
  }
}

export { DeleteAnswerController };
