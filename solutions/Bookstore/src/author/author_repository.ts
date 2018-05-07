import {DatabaseService} from '../database/database_service';

export class AuthorRepository {
  private databaseService: DatabaseService;

  constructor(databaseService: DatabaseService) {

    this.databaseService = databaseService;
  }

  public getAuthors(): Promise<Array<string>> {

    const query: string = 'SELECT name from authors';

    return this.databaseService.query(query).then((authors: Array<string>) => {
      if (Array.isArray(authors) && authors.length === 0) {

        const error = new Error('No authors have been found');
        (error as any).code = 404;

        throw error;
      }

      return authors;
    });
  }

}
