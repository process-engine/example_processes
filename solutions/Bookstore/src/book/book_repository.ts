import {DatabaseService} from '../database/database_service';
import {IBook} from '../interfaces';

export class BookRepository {
  private databaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {

    this.databaseService = databaseService;
  }

  public getBook(title: string): Promise<IBook> {

    const query: string = `select * from books where lower(title)=lower('${title}');`;

    return this.databaseService.query(query).then((book: IBook) => {

      if (book === undefined) {

        const error = new Error('Book not found');
        (error as any).code = 404;

        throw error;
      }

      return book;
    });
  }

  public getBooksByAuthor(author: string): Promise<Array<IBook>> {

    const checkAuthorQuery: string = `select exists(select 1 from authors where name='${author}')`;

    return this.databaseService.query(checkAuthorQuery).then((authorExists: Array<{
      exists: boolean,
    }>) => {

      if (authorExists[0].exists === false) {
        const error = new Error('Author not found');
        (error as any).code = 404;

        throw error;
      }

      const query: string = `select * from books where author='${author}';`;

      return this.databaseService.query(query);

    }).then((books: Array<IBook>) => {

      if (Array.isArray(books) && books.length === 0) {

        const error = new Error('No books written by this author have been found');
        (error as any).code = 404;

        throw error;
      }
      return books;
    });
  }

  public getBooks(): Promise<Array<IBook>> {

    const query: string = 'select * from books;';

    return this.databaseService.query(query);
  }
}
