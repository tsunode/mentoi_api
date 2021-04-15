import { Router } from 'express';
// import multer from 'multer';
// import uploadConfig from '@config/upload';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { CreateUserController } from '../../../useCases/createUser/CreateUserController';
import UserValidators from '../validators/User';

const usersRouter = Router();
const createUserController = new CreateUserController();
// const upload = multer(uploadConfig.multer);

usersRouter.post('/', UserValidators.create, createUserController.handle);

export default usersRouter;
