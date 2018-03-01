'use strict';

const SampleService = require('./dist/commonjs').SampleService;

const entityDiscoveryTag = require('@essential-projects/core_contracts').EntityDiscoveryTag;

const fs = require('fs');
const path = require('path');
const errorBoundaryEventBpmn = fs.readFileSync(path.join('bpmn', 'parallel_gateway.bpmn'), 'utf8');

function registerInContainer(container) {

  container.registerObject('errorBoundaryEventProcess', errorBoundaryEventBpmn)
    .setTag('bpmn_process', 'internal')

  container.register('SampleService', SampleService)
}

module.exports.registerInContainer = registerInContainer;
