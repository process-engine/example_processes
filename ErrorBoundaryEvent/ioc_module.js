'use strict';

const {
  StoreEntity,
  StoreEntityTypeService,
  ErrorBoundaryError,
} = require('./dist/commonjs');

const entityDiscoveryTag = require('@essential-projects/core_contracts').EntityDiscoveryTag;

const fs = require('fs');
const path = require('path');
const errorBoundaryEventBpmn = fs.readFileSync(path.join('bpmn', 'errorBoundaryEvent.bpmn'), 'utf8');

function registerInContainer(container) {

  container.registerObject('errorBoundaryEventProcess', errorBoundaryEventBpmn)
    .setTag('bpmn_process', 'internal')

  container.register('StoreEntity', StoreEntity)
    .tags(entityDiscoveryTag);

  container.register('StoreEntityTypeService', StoreEntityTypeService)
    .dependencies('DatastoreService');

  container.register('ErrorBoundaryError', ErrorBoundaryError)
}

module.exports.registerInContainer = registerInContainer;
