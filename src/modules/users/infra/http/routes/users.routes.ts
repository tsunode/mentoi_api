import { Router } from 'express';
// import multer from 'multer';
// import uploadConfig from '@config/upload';

import { ShowUserController } from '@modules/users/useCases/showUser/ShowUserController';
import { UpdateUserController } from '@modules/users/useCases/updateUser/UpdateUserController';
import { UpdateUserPasswordController } from '@modules/users/useCases/updateUserPassword/UpdateUserPasswordController';
import { DeleteUserController } from '@modules/users/useCases/deleteUser/DeleteUserController';
import { CreateUserController } from '../../../useCases/createUser/CreateUserController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import UserValidators from '../validators/User';

const usersRouter = Router();
const createUserController = new CreateUserController();
const showUserController = new ShowUserController();
const updateUserController = new UpdateUserController();
const updateUserPasswordController = new UpdateUserPasswordController();
const deleteUserController = new DeleteUserController();
// const upload = multer(uploadConfig.multer);

usersRouter.post('/', UserValidators.create, createUserController.handle);
usersRouter.get('/me', ensureAuthenticated, showUserController.handle);
usersRouter.put(
  '/:id',
  ensureAuthenticated,
  UserValidators.update,
  updateUserController.handle,
);
usersRouter.patch(
  '/:id',
  ensureAuthenticated,
  UserValidators.updatePassword,
  updateUserPasswordController.handle,
);
usersRouter.delete(
  '/:id',
  ensureAuthenticated,
  UserValidators.delete,
  deleteUserController.handle,
);

export { usersRouter };
