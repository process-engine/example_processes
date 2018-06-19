import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class BookstoreNav {

  public router: Router;

  constructor(router: Router) {

    this.router = router;
  }
}
