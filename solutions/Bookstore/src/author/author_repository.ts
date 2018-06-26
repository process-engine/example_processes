import {DatabaseService} from '../database/database_service';

export class AuthorRepository {

  private _databaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {

    this._databaseService = databaseService;
  }

  public getAuthors(): Promise<Array<string>> {

    const query: string = 'SELECT name from authors';

    return this._databaseService.query(query).then((authors: Array<{
      name: string;
    }>) => {
      if (Array.isArray(authors) && authors.length === 0) {

        const error = new Error('No authors have been found');
        (error as any).code = 404;

        throw error;
      }

      return authors.map((author: {
        name: string,
      }) => {
        return author.name;
      });
    });
  }

}
