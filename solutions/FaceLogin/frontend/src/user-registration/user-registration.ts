import {inject} from 'aurelia-framework';
import {HttpClient, HttpResponseMessage} from 'aurelia-http-client';
import {CameraAccess} from '../camera-access/camera-access';

enum State {
  ready,
  loading,
  success,
  failure,
  error,
}

@inject(HttpClient)
export class AddUser {

  public httpClient: HttpClient;
  public userName: string;
  public State = {
    ready: State.ready,
    loading: State.loading,
    success: State.success,
    failure: State.failure,
    error: State.error,
  };
  public state: State;

  private cameraAccess: CameraAccess;

  constructor(httpClient: HttpClient) {

    this.httpClient = httpClient;
  }

  public addUser(): void {

    const dataURL: string = this.cameraAccess.getCurrentImage();

    this.httpClient.post('http://localhost:3000/add-user', {
      dataURL: dataURL,
    }).then((result: HttpResponseMessage) => {

      const parsedResult = JSON.parse(result.response);
      this.state = parsedResult.verified ? State.success : State.failure;

    }).catch((e: ErrorEvent) => {

      this.state = State.error;
    });
  }
}
