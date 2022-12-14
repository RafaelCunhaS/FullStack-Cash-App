import express from 'express';
import 'express-async-errors';
import errorMiddleware from './middlewares/errorMiddleware';
import loginRouter from './routes/loginRouter'
import userRouter from './routes/userRouter'
import accountRouter from './routes/accountRouter'
import transactionRouter from './routes/transactionRouter'
import swaggerDocs from './utils/swagger_output.json';
import swaggerUi from "swagger-ui-express";

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');

      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);

    this.app.use('/login', loginRouter)

    this.app.use('/register', userRouter)

    this.app.use('/account', accountRouter)

    this.app.use('/transaction', transactionRouter)

    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

    this.app.use(errorMiddleware)
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();