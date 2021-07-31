import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteUserUseCase } from './DeleteUserUseCase';

class DeleteUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id, role } = request.user;
    const { id: idToDelete } = request.params;

    const deleteUser = container.resolve(DeleteUserUseCase);

    const userWasDeleted = await deleteUser.execute({
      id,
      idToDelete,
      role,
    });

    return response.json(userWasDeleted);
  }
}

export { DeleteUserController };
