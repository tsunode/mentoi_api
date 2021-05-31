import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ResetPasswordUserUseCase } from './ResetPasswordUserUseCase';

class ResetPasswordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPassword = container.resolve(ResetPasswordUserUseCase);

    await resetPassword.execute({
      password,
      token,
    });

    return response.status(204).json();
  }
}

export { ResetPasswordController };
