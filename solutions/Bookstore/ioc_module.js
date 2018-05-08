'use strict';

const {
  BookRouter,
  BookService,
  BookRepository,
  AuthorRouter,
  AuthorService,
  AuthorRepository,
  BookstoreServer,
  DatabaseService,
} = require('./dist/commonjs');

const entityDiscoveryTag = require('@essential-projects/core_contracts').EntityDiscoveryTag;
const routerDiscoveryTag = require('@essential-projects/core_contracts').RouterDiscoveryTag;

const fs = require('fs');
const path = require('path');
const faceLoginBpmn = fs.readFileSync(path.join('bpmn', 'faceLogin.bpmn'), 'utf8');

function registerInContainer(container) {

  container.registerObject('faceLoginProcess', faceLoginBpmn)
    .setTag('bpmn_process', 'internal');

  const bookRouterKey = 'BookRouterKey';
  const bookServiceKey = 'BookServiceKey';
  const bookRepositoryKey = 'BookRepositoryKey';

  const authorRouterKey = 'AuthorRouterKey';
  const authorServiceKey = 'AuthorServiceKey';
  const authorRepositoryKey = 'AuthorRepositoryKey';

  const bookstoreServerKey = 'BookstoreServerKey';
  const bookstoreRouterTag = 'BookstoreRouterTag'

  const databaseServiceKey = 'DatabaseServiceKey';

  container.register(databaseServiceKey, DatabaseService);

  container.register(bookRouterKey, BookRouter)
    .dependencies(bookServiceKey, bookstoreServerKey).tags(bookstoreRouterTag);
  container.register(bookServiceKey, BookService).dependencies(bookRepositoryKey);
  container.register(bookRepositoryKey, BookRepository).dependencies(databaseServiceKey);


  container.register(authorRouterKey, AuthorRouter)
    .dependencies(authorServiceKey, bookstoreServerKey).tags(bookstoreRouterTag);
  container.register(authorServiceKey, AuthorService).dependencies(authorRepositoryKey);
  container.register(authorRepositoryKey, AuthorRepository).dependencies(databaseServiceKey);

  container.register(bookstoreServerKey, BookstoreServer).singleton();
}

module.exports.registerInContainer = registerInContainer;
