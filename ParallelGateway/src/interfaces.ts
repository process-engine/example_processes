export interface ISampleService {
  longRunningFunction(): Promise<any>;
  veryLongRunningFunction(): Promise<any>;
}
