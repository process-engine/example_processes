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
  url: 'https://testidentityserver.westeurope.cloudapp.azure.com',
}

const externalAccessor = new ExternalTaskApiExternalAccessor(httpClient);
const externalTaskAPIService = new ExternalTaskApiClientService(externalAccessor);
const externalTaskWorker = new ExternalTaskWorker(externalTaskAPIService);

const identity = {
  token: 'ZHVtbXlfdG9rZW4=',
};
const topicName = 'AppendWorldTopic';
const maxNumberOfTasksToGet = 10;
const longPollingTimeoutInMs = 10000;

async function main() {

  const handleAppendWorldTopic = async (externalTask) => {

    console.log(externalTask);

    const result = {
      hello_world: externalTask.payload.form_fields.Form + "World",
    };

    return new ExternalTaskFinished(externalTask.id, result);
  };

  externalTaskWorker.waitForAndHandle(
    identity,
    topicName,
    maxNumberOfTasksToGet,
    longPollingTimeoutInMs,
    handleAppendWorldTopic);
}

async function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), milliseconds);
  });
}

main();
