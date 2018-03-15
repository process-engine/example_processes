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
export class GenerateFaceId {

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

  public generateFaceId(): void {

    const dataURL: string = this.cameraAccess.getCurrentImage();

    this.httpClient.post('http://localhost:3000/get-face-id', {
      imageDataURL: dataURL,
    }).then((result: HttpResponseMessage) => {

      const parsedResult: {
        faceId: string,
      } = JSON.parse(result.response);

      console.log(parsedResult);
      // this.state = parsedResult.verified ? State.success : State.failure;

    }).catch((e: ErrorEvent) => {

      this.state = State.error;
    });
  }
}
