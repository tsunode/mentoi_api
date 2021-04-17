import { Router } from 'express';

import { AuthenticateUserController } from '../../../useCases/authenticateUser/AuthenticateUserController';
import SessionValidators from '../validators/Session';

const sessionsRouter = Router();
const authenticationUserController = new AuthenticateUserController();

sessionsRouter.post(
  '/',
  SessionValidators.create,
  authenticationUserController.handle,
);

export { sessionsRouter };
