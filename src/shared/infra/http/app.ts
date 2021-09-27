import 'reflect-metadata';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import { createServer, Server } from 'http';
import { errors } from 'celebrate';

import responseError from '@shared/errors/middleware/responseError';
import { uploadConfig } from '@config/upload';

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
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use('/files', express.static(uploadConfig.uploadsFolder));
    this.app.use(routes);
    this.app.use(errors());
    this.app.use(responseError);
  }
}

export default App;
