const Chatbot = require('elizabot');
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
const topicName = 'Chatbot';
const maxNumberOfTasksToGet = 10;
const longPollingTimeoutInMs = 10000;

async function main() {

  const chatbot = new Chatbot();
  const chatbotResponse = async (externalTask) => {

    const humanRequest = externalTask.payload;

    const chatbotAnswer = chatbot.transform(humanRequest);
    return new ExternalTaskFinished(externalTask.id, chatbotAnswer);
  };

  externalTaskWorker.waitForAndHandle(
    identity,
    topicName,
    maxNumberOfTasksToGet,
    longPollingTimeoutInMs,
    chatbotResponse);
}

main();
