import {BaseRouter} from '@essential-projects/http_node';
import * as Express from 'express';
import {Request, Response} from 'express';
import {Logger} from 'loggerhythm';
import {CategoryService} from './category_service';

const logger: Logger = Logger.createLogger('category_router');

export class CategoryRouter {

  private router;
  private categoryService: CategoryService;

  constructor(categoryService: CategoryService, router) {

    this.router = router;
    this.categoryService = categoryService;
  }

  public start(): void {

    this.router.get('/category/:categoryName', (request: Request, response: Response) => {

      try {
        const categoryName: string = request.params['categoryName'];
        const books = this.categoryService.getBooksByCategory(categoryName);

        response.send(books);

      } catch (e) {

        const errorCode: number = 500;
        logger.error(e.message);
        response.status(errorCode).send(e.message);
      }

    });

    this.router.get('/hallo',(req, res) => {
      res.send('hallo')
    })

    this.router.get('/categories', (request: Request, response: Response) => {

      response.send('test')
      try {

        const books = this.categoryService.getCategories();
        response.send(books);
      } catch (e) {

        const errorCode: number = 500;
        logger.error(e.message);
        response.status(errorCode).send(e.message);
      }

    });

  }

}
