import * as Express from 'express';
import {Request, Response} from 'express';
import {Logger} from 'loggerhythm';
import {BookService} from './book_service';
import {IBook} from '../interfaces';

const logger: Logger = Logger.createLogger('book_router');

export class BookRouter {

  private router;
  private bookService: BookService;

  constructor(bookService: BookService, router) {

    this.router = router;
    this.bookService = bookService;
  }

  public start(): void {

    this.router.get('/book/:title', (request: Request, response: Response) => {

      try {
        const title: string = request.params['title'].replace(/_/g, ' ');

        this.bookService.getBook(title).then((book: IBook) => {
          response.send(book);
        });

      } catch (e) {
        const errorCode: number = (e.code !== undefined) ? e.code : 500;
        logger.error(e.message);
        response.status(errorCode).send(e.message);
      }
    });

    this.router.get('/books', (request: Request, response: Response) => {

      if (request.query['author'] !== undefined) {

        const author: string = request.query['author'].replace(/_/g, ' ');

        this.bookService.getBooksByAuthor(author).then((books: Array<IBook>) => {

          response.send(books);
        }).catch((e) => {

          const errorCode: number = (e.code !== undefined) ? e.code : 500;
          logger.error(e.message);
          response.status(errorCode).send(e.message);
        });
        return;
      }

      this.bookService.getBooks().then((books: Array<IBook>) => {

        response.send(books);
      }).catch((e) => {

        const errorCode: number = (e.code !== undefined) ? e.code : 500;
        logger.error(e.message);
        response.status(errorCode).send(e.message);
      });

    });
  }

}
