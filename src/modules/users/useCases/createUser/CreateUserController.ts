import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
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

    const createUser = container.resolve(CreateUserUseCase);

    const user = await createUser.execute({
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

export { CreateUserController };
