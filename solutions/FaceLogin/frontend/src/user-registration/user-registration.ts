import {inject} from 'aurelia-framework';
import {HttpClient, HttpResponseMessage} from 'aurelia-http-client';
import {CameraAccess} from '../camera-access/camera-access';

enum State {
  loading,
  success,
  error,
}

@inject(HttpClient)
export class AddUser {

  public httpClient: HttpClient;
  public userName: string;
  public State = {
    loading: State.loading,
    success: State.success,
    error: State.error,
  };
  public state: State;

  private cameraAccess: CameraAccess;

  constructor(httpClient: HttpClient) {

    this.httpClient = httpClient;
  }

  public addUser(): void {

    const dataURL: string = this.cameraAccess.getCurrentImage();
    this.state = State.loading;

    this.httpClient.post('http://localhost:3000/add-user', {
      userName: this.userName,
      imageDataURL: dataURL,
    }).then(() => {

      this.state = State.success;
    }).catch((httpResponse: HttpResponseMessage) => {

      console.log(`Server error: ${httpResponse.response}`);
      this.state = State.error;
    });
  }
}
