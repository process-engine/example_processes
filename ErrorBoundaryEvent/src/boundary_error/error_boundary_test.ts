export class ErrorBoundaryEvent {
  public errorMethod(): void {
    throw new Error('testError');
  }
}
