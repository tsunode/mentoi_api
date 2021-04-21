import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { ShowUserUseCase } from './ShowUserUseCase';

class ShowUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showUser = container.resolve(ShowUserUseCase);

    const user = await showUser.execute(id);

    return response.json(classToClass(user));
  }
}

export { ShowUserController };
