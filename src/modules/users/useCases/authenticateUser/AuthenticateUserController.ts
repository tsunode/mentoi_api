import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserUseCase);

    const {
      user,
      token,
      refreshToken,
      refreshTokenExpiration,
    } = await authenticateUser.execute({
      email,
      password,
    });
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      expires: refreshTokenExpiration,
    });

    return response.json({ user: classToClass(user), token });
  }
}

export { AuthenticateUserController };
