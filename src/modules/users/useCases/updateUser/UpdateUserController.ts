import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      name,
      email,
      gender,
      password,
      dateBirth,
      scholarity,
      nickName,
      areasInterest,
    } = request.body;

    const updateUser = container.resolve(UpdateUserUseCase);

    const user = await updateUser.execute({
      id,
      name,
      email,
      gender,
      password,
      dateBirth,
      scholarity,
      nickName,
      areasInterest,
    });

    return response.json(classToClass(user));
  }
}

export { UpdateUserController };
