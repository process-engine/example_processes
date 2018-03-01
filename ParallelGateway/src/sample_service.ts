import {ISampleService} from './interfaces';

export class SampleService implements ISampleService {

  public async longRunningFunction(): Promise<any> {
    await this.wait(1000);
    console.log('I just finished a long running task');
  }

  public async veryLongRunningFunction(): Promise<any> {
    await this.wait(3000);
    console.log('I just finished a VERY long running task');
  }

  private wait(milliseconds): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, milliseconds);
    });
  }
}
