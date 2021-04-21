import { Router } from 'express';
import multer from 'multer';
import { uploadConfig } from '@config/upload';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { CreateQuestionController } from '../../../useCases/CreateQuestion/CreateQuestionController';
import { QuestionValidators } from '../validators/Question';

const questionsRouter = Router();
const createQuestionController = new CreateQuestionController();
const upload = multer(uploadConfig.multer);

questionsRouter.post(
  '/',
  ensureAuthenticated,
  upload.array('files'),
  QuestionValidators.create,
  createQuestionController.handle,
);

export { questionsRouter };
