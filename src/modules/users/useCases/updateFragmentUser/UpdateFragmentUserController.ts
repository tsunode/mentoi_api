import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateFragmentUserUseCase } from './UpdateFragmentUserUseCase';

class UpdateFragmentUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    const updateFragmentUser = container.resolve(UpdateFragmentUserUseCase);

    const isUserVerified = await updateFragmentUser.execute({
      token,
    });

    return response.json(isUserVerified);
  }
}

export { UpdateFragmentUserController };
