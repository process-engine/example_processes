import {inject} from 'aurelia-framework';
import {HttpClient, HttpResponseMessage} from 'aurelia-http-client';
import {IBook} from '../interfaces';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';

@inject(HttpClient, ShoppingCartService)
export class Book {

  public book: IBook;

  private _httpClient: HttpClient;
  private _shoppingCartService: ShoppingCartService;

  constructor(httpClient: HttpClient, shoppingCartService: ShoppingCartService) {

    this._httpClient = httpClient;
    this._shoppingCartService = shoppingCartService;
  }

  public activate(params: {
    book: string,
  }): void {

    this._httpClient.get(`http://localhost:3000/book/${params.book}`, {

    }).then((result: HttpResponseMessage) => {

      const parsedResult: Array<IBook> = JSON.parse(result.response);
      const isEmptyArray: boolean = Array.isArray(parsedResult) && parsedResult.length === 0;

      if (parsedResult !== undefined && !isEmptyArray) {
        this.book = parsedResult[0];
      }
    });
  }

  public addToCart(): void {

    this._shoppingCartService.addToCart(this.book);
  }
}
