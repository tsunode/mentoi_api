import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateQuestionUseCase } from './CreateQuestionUseCase';

class CreateQuestionController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { title, description, areasInterest } = request.body;
    const { id: userId } = request.user;
    const files = request.files as Express.Multer.File[];

    const filesFields =
      files &&
      files.map(file => ({
        fileName: file.filename,
        mimeType: file.mimetype,
      }));

    const areasInterestFormated =
      typeof areasInterest === 'string'
        ? JSON.parse(areasInterest)
        : areasInterest;

    const createQuestion = container.resolve(CreateQuestionUseCase);

    const question = await createQuestion.execute({
      title,
      description,
      areasInterest: areasInterestFormated,
      userId,
      files: filesFields,
    });

    return response.json(classToPlain(question));
  }
}

export { CreateQuestionController };
