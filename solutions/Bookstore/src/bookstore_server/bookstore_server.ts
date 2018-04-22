import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import {Express, Request, Response} from 'express';
import {Logger} from 'loggerhythm';

const logger: Logger = Logger.createLogger('router');
const port: number = 3000;

export class BookstoreServer {

  public app: Express;

  public initialize(): void {

    this.app = express();
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use('/static', express.static('frontend'));
  }

  public get(url: string, callback: (request: Request, response: Response) => void): void {

    this.app.get(url, callback);
  }

  public post(url: string, callback: (request: Request, response: Response) => void): void {

    this.app.get(url, callback);
  }

  public startServer(): void {

    this.app.listen(port, () => {
      logger.info(`Bookstore server started on port: ${port}.`);
    });
  }
}
