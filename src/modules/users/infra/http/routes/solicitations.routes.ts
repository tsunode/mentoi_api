import { Router } from 'express';
import multer from 'multer';
import { uploadConfig } from '@config/upload';

import { CreateSolicitationController } from '@modules/users/useCases/createSolicitation/CreateSolicitationController';
import { SolicitationValidators } from '../validators/Solicitation';

const solicitationsRouter = Router();
const createSolicitationController = new CreateSolicitationController();

const upload = multer(uploadConfig.multer);

solicitationsRouter.post(
  '/',
  upload.array('documents'),
  SolicitationValidators.create,
  createSolicitationController.handle,
);

export { solicitationsRouter };
