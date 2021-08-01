import { Router } from 'express';
import multer from 'multer';
import { uploadConfig } from '@config/upload';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { ListQuestionsController } from '@modules/questions/useCases/ListQuestions/ListQuestionsController';
import { ShowQuestionController } from '@modules/questions/useCases/ShowQuestion/ShowQuestionController';
import { CreateAnswerController } from '@modules/questions/useCases/CreateAnswer/CreateAnswerController';
import { ListAnswersController } from '@modules/questions/useCases/ListAnswers/ListAnswersController';
import { DeleteQuestionController } from '@modules/questions/useCases/DeleteQuestion/DeleteQuestionController';
import { DeleteAnswerController } from '@modules/questions/useCases/DeleteAnswer/DeleteAnswerController';
import { getUser } from '@modules/users/infra/http/middlewares/getUser';
import { ComplaintQuestionController } from '@modules/questions/useCases/ComplaintQuestion/ComplaintQuestionController';
import { CreateQuestionController } from '../../../useCases/CreateQuestion/CreateQuestionController';
import { QuestionValidators } from '../validators/Question';
import { AnswerValidators } from '../validators/Answer';

const questionsRouter = Router();
const createQuestionController = new CreateQuestionController();
const listQuestionsController = new ListQuestionsController();
const showQuestionController = new ShowQuestionController();
const createAnswerController = new CreateAnswerController();
const listAnswersController = new ListAnswersController();
const deleteQuestionController = new DeleteQuestionController();
const deleteAnswerController = new DeleteAnswerController();
const complaintQuestionController = new ComplaintQuestionController();
const upload = multer(uploadConfig.multer);

questionsRouter.post(
  '/',
  ensureAuthenticated,
  upload.array('files'),
  QuestionValidators.create,
  createQuestionController.handle,
);

questionsRouter.get(
  '/:id',
  QuestionValidators.show,
  showQuestionController.handle,
);

questionsRouter.get(
  '/',
  getUser,
  QuestionValidators.index,
  listQuestionsController.handle,
);

questionsRouter.delete(
  '/:id',
  ensureAuthenticated,
  QuestionValidators.delete,
  deleteQuestionController.handle,
);

questionsRouter.post(
  '/:id/answers',
  ensureAuthenticated,
  AnswerValidators.create,
  createAnswerController.handle,
);

questionsRouter.get(
  '/:id/answers',
  AnswerValidators.index,
  listAnswersController.handle,
);

questionsRouter.delete(
  '/:id/answers/:answerId',
  ensureAuthenticated,
  AnswerValidators.delete,
  deleteAnswerController.handle,
);

questionsRouter.post(
  '/:id/complaint',
  getUser,
  QuestionValidators.complaint,
  complaintQuestionController.handle,
);

export { questionsRouter };
