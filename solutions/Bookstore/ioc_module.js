'use strict';

const {
  CategoryRouter,
  CategoryService,
  CategoryRepository,
  BookstoreServer,
} = require('./dist/commonjs');

const entityDiscoveryTag = require('@essential-projects/core_contracts').EntityDiscoveryTag;
const routerDiscoveryTag = require('@essential-projects/core_contracts').RouterDiscoveryTag;

const fs = require('fs');
const path = require('path');
const faceLoginBpmn = fs.readFileSync(path.join('bpmn', 'faceLogin.bpmn'), 'utf8');

function registerInContainer(container) {

  container.registerObject('faceLoginProcess', faceLoginBpmn)
    .setTag('bpmn_process', 'internal');

  const categoryRouterKey = 'CategoryRouterKey';
  const categoryServiceKey = 'CategoryServiceKey';
  const categoryRepositoryKey = 'CategoryRepositoryKey';
  const bookstoreServerKey = 'BookstoreServerKey';
  const bookstoreRouterTag = 'BookstoreRouterTag'

  const bookstoreRouter = container.register(categoryRouterKey, CategoryRouter)
        .dependencies(categoryServiceKey, bookstoreServerKey).tags(bookstoreRouterTag);
  container.register(categoryServiceKey, CategoryService).dependencies(categoryRepositoryKey);
  container.register(categoryRepositoryKey, CategoryRepository);


  container.register(bookstoreServerKey, BookstoreServer).singleton();
}

module.exports.registerInContainer = registerInContainer;
