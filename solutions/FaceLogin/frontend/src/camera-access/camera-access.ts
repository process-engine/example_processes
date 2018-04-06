export class CameraAccess {

  public videoElement: HTMLVideoElement;
  public attached(): void {

    this.getMediaStream()
      .then((stream: MediaStream) => {

        if (this.videoElement.srcObject !== undefined) {
          this.videoElement.srcObject = stream;
        } else {
          this.videoElement.src = window.URL.createObjectURL(stream);
        }
        this.videoElement.onloadedmetadata = this.videoElement.play;
      });
  }

  public getMediaStream(): Promise<MediaStream> {

    if (navigator.mediaDevices === undefined) {
      (navigator as any).mediaDevices = {};
    }

    if (navigator.mediaDevices.getUserMedia !== undefined) {

      return navigator.mediaDevices.getUserMedia({video: true});
    }

    const getUserMedia = (navigator as any).webkitGetUserMedia
      || (navigator as any).mozGetUserMedia;
    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }

    return new Promise((resolve, reject) => {
      getUserMedia.call(navigator, {video: true}, resolve, reject);
    });
  }

  public getCurrentImage(): string {

    const canvas: HTMLCanvasElement = document.createElement('canvas');
    document.body.appendChild(canvas);

    const width: number = this.videoElement.clientWidth;
    const height: number = this.videoElement.clientHeight;
    canvas.width = width;
    canvas.height = height;
    const context: CanvasRenderingContext2D = canvas.getContext('2d');
    context.drawImage(this.videoElement, 0, 0, width, height);
    const dataURL: string = canvas.toDataURL('image/png');
    document.body.removeChild(canvas);

    return dataURL;
  }

}
