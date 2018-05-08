import {HttpClient, HttpResponseMessage} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {IBook} from '../interfaces';

@inject(HttpClient)
export class Book {

  private httpClient: HttpClient;
  private book: IBook;

  constructor(httpClient: HttpClient) {

    this.httpClient = httpClient;
  }

  public activate(params: {
    book: string
  }): void {

    this.httpClient.get(`http://localhost:3000/book/${params.book}`, {

    }).then((result: HttpResponseMessage) => {

      const parsedResult = JSON.parse(result.response);
      const isEmptyArray = Array.isArray(parsedResult) && parsedResult.length === 0;
      console.log(parsedResult)
      if (parsedResult !== undefined && !isEmptyArray) {
        this.book = parsedResult[0];
      }
    });
  }
}
