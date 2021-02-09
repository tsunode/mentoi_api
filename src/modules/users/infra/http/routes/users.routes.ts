import { Router } from 'express';
// import multer from 'multer';
// import uploadConfig from '@config/upload';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserValidators from '../validators/User';

const usersRouter = Router();
const usersController = new UsersController();
// const upload = multer(uploadConfig.multer);

usersRouter.post('/', UserValidators.create, usersController.create);

export default usersRouter;
