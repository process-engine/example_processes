import {ISampleService} from './interfaces';

import {Logger} from 'loggerhythm';

const logger: any = Logger.createLogger('parallel_gateway:sample_service');

export class SampleService implements ISampleService {

  public async longRunningFunction(): Promise<string> {
    await this.wait(1000);
    logger.info('longRunningFunction has finished');
    return 'longRunningFunction has finished';
  }

  public async veryLongRunningFunction(): Promise<string> {
    await this.wait(3000);
    logger.info('veryLongRunningFunction has finished');
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
