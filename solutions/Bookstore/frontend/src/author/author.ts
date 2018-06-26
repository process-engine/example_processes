import {HttpClient, HttpResponseMessage} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {IBook} from '../interfaces';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class Author {

  public books: Array<IBook>;
  public  author: string;

  private _httpClient: HttpClient;
  private _router: Router;

  constructor(httpClient: HttpClient, router: Router) {

    this._httpClient = httpClient;
    this._router = router;
  }

  public goToBook(title: string) {
    const bookTitle: string = title.replace(/\s/g, '_');
    this._router.navigate(`/book/${bookTitle}`)
  }

  public activate(params: {
    author: string
  }) {

    this.author = params.author.replace(/_/g, ' ');

    this._httpClient.get(`http://localhost:3000/books`, {
      author: params.author,
    }).then((result: HttpResponseMessage) => {

      const parsedResult = JSON.parse(result.response);

      const isEmptyArray = Array.isArray(parsedResult) && parsedResult.length === 0;
      if (parsedResult !== undefined && !isEmptyArray) {
        this.books = parsedResult;
      }
    });
  }
}
