import { Router } from 'express';
import multer from 'multer';
import { uploadConfig } from '@config/upload';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { FindAllQuestionController } from '@modules/questions/useCases/FindAllQuestion/FindAllQuestionController';
import { CreateQuestionController } from '../../../useCases/CreateQuestion/CreateQuestionController';
import { QuestionValidators } from '../validators/Question';

const questionsRouter = Router();
const createQuestionController = new CreateQuestionController();
const findAllQuestionController = new FindAllQuestionController();
const upload = multer(uploadConfig.multer);

questionsRouter.post(
  '/',
  ensureAuthenticated,
  upload.array('files'),
  QuestionValidators.create,
  createQuestionController.handle,
);

questionsRouter.get(
  '/',
  QuestionValidators.index,
  findAllQuestionController.handle,
);

export { questionsRouter };
