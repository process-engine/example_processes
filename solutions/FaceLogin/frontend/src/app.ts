import {inject} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';

@inject(Router)
export class App {

  private router: Router;

  public configureRouter(config: RouterConfiguration, router: Router): void {

    this.router = router;
    config.title = 'Aurelia';
    config.map([
      {
        route: ['user-registration', ''],
        name: 'userRegistration',
        moduleId: 'user-registration/user-registration',
      },
      {
        route: ['generate-face-id'],
        name: 'generateFaceId',
        moduleId: 'generate-face-id/generate-face-id',
      },
    ]);
  }
}
