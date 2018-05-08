import {BookRepository} from './book_repository';
import {IBook} from '../interfaces';

export class BookService {

  private bookRepository: BookRepository;

  constructor(bookRepository: BookRepository) {

    this.bookRepository = bookRepository;
  }

  public getBook(title: string): Promise<IBook> {

    return this.bookRepository.getBook(title);
  }

  public getBooksByAuthor(author: string): Promise<Array<IBook>> {

    return this.bookRepository.getBooksByAuthor(author);
  }

  public getBooks(): Promise<Array<IBook>> {

    return this.bookRepository.getBooks();
  }
}
