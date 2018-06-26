import {AureliaCookie} from 'aurelia-cookie';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import {IBook, ICartEntry} from '../interfaces';

@inject(EventAggregator)
export class ShoppingCartService {

  private _eventAggregator: EventAggregator;

  constructor(eventAggregator: EventAggregator) {

    this._eventAggregator = eventAggregator;
  }

  public addToCart(book: IBook): void {

    const bookTitle: string = book.title;
    let cookie: Array<ICartEntry> = this.getCartContents();

    if (cookie === undefined) {

      cookie = [
        {
          title: bookTitle,
          num: 1,
        },
      ];
      this._saveCookie(cookie);
      return;
    }

    const existingEntry: ICartEntry = cookie
      .find((entry: ICartEntry) => entry.title === bookTitle);

    if (existingEntry === undefined) {

      const newEntry: ICartEntry = {
        title: bookTitle,
        num: 1,
      };

      cookie.push(newEntry);
      this._saveCookie(cookie);
      return;
    }

    existingEntry.num++;

    this._saveCookie(cookie);
  }

  private _saveCookie(cookieContents: Array<ICartEntry>): void {

    AureliaCookie.set('cart', JSON.stringify(cookieContents), {
      expiry: 1,
      path: '',
      domain: '',
      secure: false,
    });
    this._eventAggregator.publish('cartUpdate');
  }

  public getCartContents(): Array<ICartEntry> {

    if (AureliaCookie.get('cart') === null) {
      return undefined;
    }

    return JSON.parse(AureliaCookie.get('cart'));
  }

  public getNumberOfBooks(): number {

    const cartContent: Array<ICartEntry> = this.getCartContents();

    if (cartContent === undefined) {
      return 0;
    }

    const numberOfBooks: number = cartContent
      .reduce((acc: number, current: ICartEntry) => {
      return acc + current.num;
      }, 0);

    return numberOfBooks;
  }
}
