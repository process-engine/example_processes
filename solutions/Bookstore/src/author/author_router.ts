import {BaseRouter} from '@essential-projects/http_node';
import * as Express from 'express';
import {Request, Response} from 'express';
import {Logger} from 'loggerhythm';
import {AuthorService} from './author_service';

const logger: Logger = Logger.createLogger('author_router');

export class AuthorRouter {

  private router;
  private authorService: AuthorService;

  constructor(authorService: AuthorService, router) {

    this.router = router;
    this.authorService = authorService;
  }

  public start(): void {

    this.router.get('/authors', (request: Request, response: Response) => {

      try {

        this.authorService.getAuthors().then((authors: Array<string>) => {

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
