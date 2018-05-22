
'use strict';
const Chatbot = require('elizabot');

const entityDiscoveryTag = require('@essential-projects/core_contracts').EntityDiscoveryTag;

const fs = require('fs');
const path = require('path');
const chatbotBpmn = fs.readFileSync(path.join('bpmn', 'chatbot.bpmn'), 'utf8');

function registerInContainer(container) {

  container.registerObject('chatbotProcess', chatbotBpmn)
    .setTag('bpmn_process', 'internal')

  const chatbotKey = 'Chatbot';
  container.register(chatbotKey, Chatbot);
}

module.exports.registerInContainer = registerInContainer;
