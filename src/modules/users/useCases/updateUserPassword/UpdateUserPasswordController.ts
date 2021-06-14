import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserPasswordUseCase } from './UpdateUserPasswordUseCase';

class UpdateUserPasswordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { oldPassword, password } = request.body;

    const updateUserPassword = container.resolve(UpdateUserPasswordUseCase);

    await updateUserPassword.execute({
      id,
      oldPassword,
      password,
    });

    return response.status(204).json();
  }
}

export { UpdateUserPasswordController };
