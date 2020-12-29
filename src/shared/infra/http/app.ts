import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { createServer, Server } from 'http';

import '../typeorm';

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
  }
}

export default App;
