import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import { AuthenticateUserController } from '@modules/users/useCases/authenticateUser/AuthenticateUserController';
import SessionValidators from '@modules/users/infra/http/validators/Session';
import { QuestionValidators } from '@modules/questions/infra/http/validators/Question';
import { CreateQuestionController } from '@modules/questions/useCases/CreateQuestion/CreateQuestionController';

const authenticationUserController = new AuthenticateUserController();
const createQuestionController = new CreateQuestionController();
const routes = Router();

routes.post(
  '/auth/login',
  SessionValidators.create,
  authenticationUserController.handle,
);

routes.post(
  '/questions',
  ensureAuthenticated,
  QuestionValidators.create,
  createQuestionController.handle,
);

export { routes };
