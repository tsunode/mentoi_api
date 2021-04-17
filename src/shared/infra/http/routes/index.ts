import { Router } from 'express';

import { usersRouter } from '@modules/users/infra/http/routes/users.routes';
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes';
import { questionsRouter } from '@modules/questions/infra/http/routes/questions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/questions', questionsRouter);

export { routes };
