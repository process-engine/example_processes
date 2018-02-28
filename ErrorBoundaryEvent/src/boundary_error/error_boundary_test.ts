export class ErrorBoundaryError {
  public errorMethod(): void {
    throw new Error('testError');
  }
}
