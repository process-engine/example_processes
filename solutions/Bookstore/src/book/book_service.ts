import {BookRepository} from './book_repository';
import {IBook} from '../interfaces';

export class BookService {

  private _bookRepository: BookRepository;

  constructor(bookRepository: BookRepository) {

    this._bookRepository = bookRepository;
  }

  public getBook(title: string): Promise<IBook> {

    return this._bookRepository.getBook(title);
  }

  public getBooksByAuthor(author: string): Promise<Array<IBook>> {

    return this._bookRepository.getBooksByAuthor(author);
  }

  public getBooks(): Promise<Array<IBook>> {

    return this._bookRepository.getBooks();
  }
}
