import {AuthorRepository} from './author_repository';

export class AuthorService {

  private _authorRepository: AuthorRepository;

  constructor(authorRepository: AuthorRepository) {

    this._authorRepository = authorRepository;
  }

  public getAuthors(): Promise<Array<string>> {

    return this._authorRepository.getAuthors();
  }
}
