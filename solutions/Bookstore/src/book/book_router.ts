import * as Express from 'express';
import {Request, Response} from 'express';
import {Logger} from 'loggerhythm';
import {BookService} from './book_service';
import {IBook} from '../interfaces';

const logger: Logger = Logger.createLogger('book_router');

export class BookRouter {

  private _router: Express.Router;
  private _bookService: BookService;

  constructor(bookService: BookService, router: Express.Router) {

    this._router = router;
    this._bookService = bookService;
  }

  public start(): void {

    this._router.get('/book/:title', (request: Request, response: Response) => {

      try {
        const title: string = request.params['title'].replace(/_/g, ' ');

        this._bookService.getBook(title).then((book: IBook) => {
          response.send(book);
        });

      } catch (e) {
        const errorCode: number = (e.code !== undefined) ? e.code : 500;
        logger.error(e.message);
        response.status(errorCode).send(e.message);
      }
    });

    this._router.get('/books', (request: Request, response: Response) => {

      if (request.query['author'] !== undefined) {

        const author: string = request.query['author'].replace(/_/g, ' ');

        this._bookService.getBooksByAuthor(author).then((books: Array<IBook>) => {

          response.send(books);
        }).catch((e) => {

          const errorCode: number = (e.code !== undefined) ? e.code : 500;
          logger.error(e.message);
          response.status(errorCode).send(e.message);
        });
        return;
      }

      this._bookService.getBooks().then((books: Array<IBook>) => {

        response.send(books);
      }).catch((e) => {

        const errorCode: number = (e.code !== undefined) ? e.code : 500;
        logger.error(e.message);
        response.status(errorCode).send(e.message);
      });

    });
  }

}
