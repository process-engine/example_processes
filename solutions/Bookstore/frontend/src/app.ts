import {RouterConfiguration, Router} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = 'Bookstore';
    config.map([
      {
        route: [''],
        moduleId: 'welcome/welcome',
        nav: true,
        title: 'Home',
      },
      {
        route: ['author/:author'],
        moduleId: 'author/author'
      },
      {
        route: ['book/:book'],
        moduleId: 'book/book',
      },
      {
        route: ['books'],
        moduleId: 'books/books',
        nav: true,
        title: 'Books',
      },
      {
        route: ['shopping-cart'],
        moduleId: 'shopping-cart/shopping-cart',
        nav: true,
        title: 'Shopping cart',
      },
    ]);
  }
}
