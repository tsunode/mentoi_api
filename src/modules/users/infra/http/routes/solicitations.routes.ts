import { Router } from 'express';
import multer from 'multer';
import { uploadConfig } from '@config/upload';

import { CreateUserController } from '../../../useCases/createUser/CreateUserController';
import { SolicitationValidators } from '../validators/Solicitation';

const solicitationsRouter = Router();
const createUserController = new CreateUserController();

const upload = multer(uploadConfig.multer);

solicitationsRouter.post(
  '/',
  upload.array('documents'),
  SolicitationValidators.create,
  createUserController.handle,
);

export { solicitationsRouter };
