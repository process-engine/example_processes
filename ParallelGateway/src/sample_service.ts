import {ISampleService} from './interfaces';

import {Logger} from 'loggerhythm';

const logger: any = Logger.createLogger('parallel_gateway:sample_service');

export class SampleService implements ISampleService {

  public async currentTokenTestPart1(): Promise<string> {
    const currentTokenValue: string = 'current token test value';
    logger.info(`Setting the expected token.current value to: ${currentTokenValue}`);
    return currentTokenValue;
  }

  public async currentTokenTestPart2(currentTokenValue: string): Promise<string> {
    logger.info(`currentTokenTestPart2 has received current token: ${currentTokenValue}`);
    return currentTokenValue;
  }

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
