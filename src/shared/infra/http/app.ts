import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { createServer, Server } from 'http';
import { errors } from 'celebrate';

import responseError from '@shared/errors/middleware/responseError';
import { routes } from './routes';

import '../typeorm';
import '../../container';

class App {
  public app: express.Application;

  public server: Server;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);

    this.middlewares();
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(routes);
    this.app.use(errors());
    this.app.use(responseError);
  }
}

export default App;
