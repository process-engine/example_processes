import {RouterConfiguration, Router} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = 'Bookstore';
    config.map([
      {
        route: [''],
        moduleId: 'welcome/welcome'
      },
    ]);
  }
}
