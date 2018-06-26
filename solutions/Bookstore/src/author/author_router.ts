import * as Express from 'express';
import {Request, Response} from 'express';
import {Logger} from 'loggerhythm';
import {AuthorService} from './author_service';

const logger: Logger = Logger.createLogger('author_router');

export class AuthorRouter {

  private _router: Express.Router;
  private _authorService: AuthorService;

  constructor(authorService: AuthorService, router: Express.Router) {

    this._router = router;
    this._authorService = authorService;
  }

  public start(): void {

    this._router.get('/authors', (request: Request, response: Response) => {

      try {

        this._authorService.getAuthors().then((authors: Array<string>) => {

          response.send(authors);
        });
      } catch (e) {

        const errorCode: number = 500;
        logger.error(e.message);
        response.status(errorCode).send(e.message);
      }

    });

  }

}
