const {HttpClient} = require('@essential-projects/http');
const {
  ExternalTaskApiClientService,
  ExternalTaskApiExternalAccessor,
  ExternalTaskWorker,
} = require('@process-engine/external_task_api_client');
const {
  ExternalTaskFinished,
} = require('@process-engine/external_task_api_contracts');

const httpClient = new HttpClient();
httpClient.config = {
  url: 'http://localhost:8000',
}

const externalAccessor = new ExternalTaskApiExternalAccessor(httpClient);
const externalTaskAPIService = new ExternalTaskApiClientService(externalAccessor);
const externalTaskWorker = new ExternalTaskWorker(externalTaskAPIService);

const identity = {
  token: 'ZHVtbXlfdG9rZW4=',
};
const topicName = 'TestTopic';
const maxNumberOfTasksToGet = 10;
const longPollingTimeoutInMs = 10000;

async function main() {

  const handleTask = async (externalTask) => {
    console.log(externalTask);

    await sleep(40000);

    const result = { 
      testproperty: 'Fertig',
      testproperty2: 10 
    };

    return new ExternalTaskFinished(externalTask.id, result);
  };

  externalTaskWorker.waitForAndHandle(
    identity,
    topicName,
    maxNumberOfTasksToGet,
    longPollingTimeoutInMs,
    handleTask);
}

async function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), milliseconds);
  });
}

main();
