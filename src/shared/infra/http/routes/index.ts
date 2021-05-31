import { Router } from 'express';

import { usersRouter } from '@modules/users/infra/http/routes/users.routes';
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes';
import { questionsRouter } from '@modules/questions/infra/http/routes/questions.routes';
import { solicitationsRouter } from '@modules/users/infra/http/routes/solicitations.routes';
import { authRouter } from '@modules/users/infra/http/routes/auth.routes';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/solicitations', solicitationsRouter);
routes.use('/questions', questionsRouter);

export { routes };
