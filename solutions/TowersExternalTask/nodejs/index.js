const {HttpClient} = require('@essential-projects/http');
const {
  ExternalTaskApiClientService,
  ExternalTaskApiExternalAccessor,
  ExternalTaskWorker,
} = require('@process-engine/external_task_api_client');

const {TowerService} = require('./tower-service');


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

const maxNumberOfTasksToGet = 1;
const longPollingTimeoutInMs = 10000;

const towerService = new TowerService();

function registerTask(topicName, callback) {
  externalTaskWorker.waitForAndHandle(
    identity,
    topicName,
    maxNumberOfTasksToGet,
    longPollingTimeoutInMs,
    callback.bind(towerService));
}

registerTask('TakeElement', towerService.takeElement);
registerTask('PutElement', towerService.putElement);
registerTask('ShowTowers', towerService.showTowers);
registerTask('CheckIfEmpty', towerService.checkIfEmpty);
