import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';
import SessionValidators from '../validators/Session';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', SessionValidators.create, sessionsController.create);

export default sessionsRouter;
