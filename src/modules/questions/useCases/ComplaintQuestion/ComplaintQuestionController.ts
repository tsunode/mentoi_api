import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ComplaintQuestionUseCase } from './ComplaintQuestionUseCase';

class ComplaintQuestionController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { answerId } = request.body;
    const { id: userId } = request.user;

    const complaintQuestion = container.resolve(ComplaintQuestionUseCase);

    const complaint = await complaintQuestion.execute({
      questionId: id,
      answerId,
      userId,
    });

    return response.json(classToClass(complaint));
  }
}

export { ComplaintQuestionController };
