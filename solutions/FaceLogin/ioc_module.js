'use strict';

const {
  FaceRecognitionService,
  FaceRecognitionServer,
  FaceRecognitionRepository,
} = require('./dist/commonjs');

const entityDiscoveryTag = require('@essential-projects/core_contracts').EntityDiscoveryTag;

const fs = require('fs');
const path = require('path');
const faceLoginBpmn = fs.readFileSync(path.join('bpmn', 'faceLogin.bpmn'), 'utf8');

function registerInContainer(container) {

  container.registerObject('faceLoginProcess', faceLoginBpmn)
    .setTag('bpmn_process', 'internal')

  const faceRecognitionServerKey = 'FaceRecognitionServer';
  const faceRecognitionServiceKey = 'FaceRecognitionService';
  const faceRecognitionRepositoryKey = 'FaceRecognitionRepository';

  container.register(faceRecognitionServerKey, FaceRecognitionServer)
    .dependencies(faceRecognitionServiceKey);

  container.register(faceRecognitionServiceKey, FaceRecognitionService)
    .dependencies(faceRecognitionRepositoryKey)
    .configure('face-login:service');

  container.register(faceRecognitionRepositoryKey, FaceRecognitionRepository);

}

module.exports.registerInContainer = registerInContainer;
