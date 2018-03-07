'use strict';

const should = require('should');
const setup = require('./setup');

describe('Parallel Gateway execution', function () {

  let processEngineService;

  let dummyContext;

  before(async () => {
    await setup.initialize();
    dummyContext = await setup.createContext();
    processEngineService = await setup.resolveAsync('ProcessEngineService');
  });

  // TODO: This test currently fails, because the parallel gateway does not behave as expected.
  // See Issue: https://github.com/process-engine/process_engine/issues/48
  it(`should successfully run two parallel tasks and contain the result of each task in the token history.`, async () => {
    const processKey = 'parallel_gateway';
    const initialToken = {};
    const result = await processEngineService.executeProcess(dummyContext, undefined, processKey, initialToken);

    const expectedHistoryEntryForTask1 = 'st_longTask';
    const expectedHistoryEntryForTask2 = 'st_veryLongTask';
    const expectedTask1Result = 'longRunningFunction has finished';
    const expectedTask2Result = 'veryLongRunningFunction has finished';

    const expectedHistoryEntryForTokenTestTask = 'st_currentTokenTestPart2';
    const expectedTokenTestTaskResult = 'current token test value';

    should(result).have.keys(expectedHistoryEntryForTask1, expectedHistoryEntryForTask2);
    should(result[expectedHistoryEntryForTask1]).be.equal(expectedTask1Result);
    should(result[expectedHistoryEntryForTask2]).be.equal(expectedTask2Result);
  });
});
