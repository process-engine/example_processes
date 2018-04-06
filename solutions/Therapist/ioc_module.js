'use strict';
const Therapist = require('elizabot');

const entityDiscoveryTag = require('@essential-projects/core_contracts').EntityDiscoveryTag;

const fs = require('fs');
const path = require('path');
const therapistBpmn = fs.readFileSync(path.join('bpmn', 'therapist.bpmn'), 'utf8');

function registerInContainer(container) {

  container.registerObject('therapistProcess', therapistBpmn)
    .setTag('bpmn_process', 'internal')

  const therapistKey = 'Therapist';
  container.register(therapistKey, Therapist);
}

module.exports.registerInContainer = registerInContainer;
