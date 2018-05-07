import {AuthorRepository} from './author_repository';

export class AuthorService {

  private authorRepository: AuthorRepository;

  constructor(authorRepository: AuthorRepository) {

    this.authorRepository = authorRepository;
  }

  public getAuthors(): Promise<Array<string>> {

    return this.authorRepository.getAuthors();
  }
}
