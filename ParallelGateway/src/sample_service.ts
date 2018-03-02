import {ISampleService} from './interfaces';

export class SampleService implements ISampleService {

  public async longRunningFunction(): Promise<string> {
    await this.wait(1000);
    console.log('longRunningFunction has finished');
    return 'longRunningFunction has finished';
  }

  public async veryLongRunningFunction(): Promise<string> {
    await this.wait(3000);
    console.log('veryLongRunningFunction has finished');
    return 'veryLongRunningFunction has finished';
  }

  private wait(milliseconds): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, milliseconds);
    });
  }
}
