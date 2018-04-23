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
  public faceId: string;

  private cameraAccess: CameraAccess;

  constructor(httpClient: HttpClient) {

    this.httpClient = httpClient;
  }

  public generateFaceId(): void {

    const dataURL: string = this.cameraAccess.getCurrentImage();

    this.httpClient.post('http://localhost:3000/generate-face-id', {
      imageDataURL: dataURL,
    }).then((result: HttpResponseMessage) => {
      this.faceId = result.response;

    }).catch((e: ErrorEvent) => {
      this.state = State.error;
    });
  }

  public isClipboardSupported(): boolean {

    const clipboardIsSupported: boolean = document.queryCommandSupported('copy');

    return clipboardIsSupported;
  }

  public copyToClipboard(): void {

    const pseudoInputElement: HTMLInputElement = document.createElement('input');
    pseudoInputElement.style.opacity = '0';
    pseudoInputElement.style.position = 'absolute';
    document.body.appendChild(pseudoInputElement);
    pseudoInputElement.value = this.faceId;
    pseudoInputElement.focus();
    pseudoInputElement.select();

    document.execCommand('copy', false, null);
    document.body.removeChild(pseudoInputElement);
  }
}
