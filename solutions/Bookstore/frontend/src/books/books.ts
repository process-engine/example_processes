import {HttpClient, HttpResponseMessage} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {IBook} from '../interfaces';

@inject(HttpClient)
export class Books {

  public books: Array<IBook>;
  public authors: Array<string>;

  private _httpClient: HttpClient;

  constructor(httpClient: HttpClient) {

    this._httpClient = httpClient;
  }

  public activate(params: {
    book: string
  }): void {
    this._httpClient.get(`http://localhost:3000/books`).then((result: HttpResponseMessage) => {

      const parsedResult = JSON.parse(result.response);
      const isEmptyArray = Array.isArray(parsedResult) && parsedResult.length === 0;
        if (parsedResult !== undefined && !isEmptyArray) {

          this.books = parsedResult;
        }
      return this._httpClient.get(`http://localhost:3000/authors`);
    }).then((result: HttpResponseMessage) => {

        const parsedResult = JSON.parse(result.response);
        const isEmptyArray = Array.isArray(parsedResult) && parsedResult.length === 0;
        if (parsedResult !== undefined && !isEmptyArray) {
          this.authors = parsedResult;
        }



      })
  }
}
