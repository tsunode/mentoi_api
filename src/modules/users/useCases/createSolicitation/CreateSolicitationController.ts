import { AppError } from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSolicitationUseCase } from './CreateSolicitationUseCase';

class CreateSolicitationController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, observation, type } = request.body;

    const files = request.files as Express.Multer.File[];

    if (!files || !files.length) {
      throw new AppError('Documents is required');
    }

    const filesFields =
      files &&
      files.map(file => ({
        fileName: file.filename,
        mimeType: file.mimetype,
      }));

    const createSolicitation = container.resolve(CreateSolicitationUseCase);

    const solicitation = await createSolicitation.execute({
      email,
      observation,
      type,
      files: filesFields,
    });

    return response.json(classToClass(solicitation));
  }
}

export { CreateSolicitationController };
