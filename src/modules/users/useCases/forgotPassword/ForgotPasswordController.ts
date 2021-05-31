import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ForgotPasswordUserUseCase } from './ForgotPasswordUserUseCase';

class ForgotPasswordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmail = container.resolve(
      ForgotPasswordUserUseCase,
    );

    await sendForgotPasswordEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}

export { ForgotPasswordController };
