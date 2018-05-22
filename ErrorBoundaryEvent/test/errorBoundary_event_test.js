'use strict';

const should = require('should');
const setup = require('./setup');

describe('Error Boundary Event execution', function () {
  let processEngineService;
  let dummyContext;

  before(async () => {
    await setup.initialize();
    dummyContext = await setup.createContext();
    processEngineService = await setup.resolveAsync('ProcessEngineService');
  });

  it(`should successfully detect the error and contain the result in the token history.`, async () => {
    const processKey = 'error';
    const initialToken = {};
    const result = await processEngineService.executeProcess(dummyContext, undefined, processKey, initialToken);

    const expectedHistoryEntry = 'message';
    const expectedTaskResult = 'testError';

    should(result).have.key(expectedHistoryEntry);
    should(result[expectedHistoryEntry]).be.equal(expectedTaskResult);
  });
});