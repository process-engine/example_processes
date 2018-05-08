import {HttpClient, HttpResponseMessage} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class BookstoreNav {

  public authors: Array<string>;
  public authorsSelected: boolean = false;

  private httpClient: HttpClient;
  private router: Router;

  constructor(httpClient: HttpClient, router: Router) {

    this.httpClient = httpClient;
    this.router = router;
  }

  public attached(): void {

    this.loadAuthors().then((authors: Array<string>) => {
      this.authors = authors;
    });
  }

  private loadAuthors(): Promise<Array<string>> {

    return this.httpClient.get('http://localhost:3000/authors', {

    }).then((result: HttpResponseMessage) => {

      const authors: Array<string> = JSON.parse(result.response);
      return authors;
    });
  }

  public goToAuthor(authorName: string): void {

    const author: string = authorName.replace(/\s/g, '_');
    this.router.navigate(`/author/${author}`)
  }

  public goToBooks(): void {
    this.router.navigate('/books')
  }

  public goToHome(): void {
    this.router.navigate('/')
  }

  public toggleAuthors(): void {

    this.authorsSelected = !this.authorsSelected;
  }

}
