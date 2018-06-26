import {HttpClient, HttpResponseMessage} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {IBook} from '../interfaces';

@inject(HttpClient)
export class Book {

  private _httpClient: HttpClient;
  private _book: IBook;

  constructor(httpClient: HttpClient) {

    this._httpClient = httpClient;
  }

  public activate(params: {
    book: string
  }): void {

    this._httpClient.get(`http://localhost:3000/book/${params.book}`, {

    }).then((result: HttpResponseMessage) => {

      const parsedResult = JSON.parse(result.response);
      const isEmptyArray = Array.isArray(parsedResult) && parsedResult.length === 0;

      if (parsedResult !== undefined && !isEmptyArray) {
        this._book = parsedResult[0];
      }
    });
  }
}
