'use strict';

const bootstrapperIocModule = require('@essential-projects/bootstrapper/ioc_module');
const bootstrapperNodeIocModule = require('@essential-projects/bootstrapper_node/ioc_module');
const InvocationContainer = require('addict-ioc').InvocationContainer;
const logger = require('loggerhythm').Logger.createLogger('bootstrapper');

const iocModuleNames = [
  '..',
  '@essential-projects/services',
  '@essential-projects/bootstrapper',
  '@essential-projects/bootstrapper_node',
  '@essential-projects/caching',
  '@essential-projects/core',
  '@essential-projects/data_model',
  '@essential-projects/data_model_contracts',
  '@essential-projects/datasource_adapter_base',
  '@essential-projects/datasource_adapter_postgres',
  '@essential-projects/datastore',
  '@essential-projects/datastore_http',
  '@essential-projects/datastore_messagebus',
  '@essential-projects/event_aggregator',
  '@essential-projects/feature',
  '@essential-projects/http_extension',
  '@essential-projects/iam',
  '@essential-projects/iam_http',
  '@essential-projects/invocation',
  '@essential-projects/messagebus',
  '@essential-projects/messagebus_http',
  '@essential-projects/messagebus_adapter_faye',
  '@essential-projects/metadata',
  '@essential-projects/pki_service',
  '@process-engine/consumer_api',
  '@process-engine/process_engine',
  '@process-engine/process_engine_http',
  '@process-engine/process_repository',
  '@essential-projects/security_service',
  '@essential-projects/routing',
  '@essential-projects/timing',
  '@essential-projects/validation',
];

const iocModules = iocModuleNames.map((moduleName) => {
  return require(`${moduleName}/ioc_module`);
});

async function start() {

  const container = new InvocationContainer({
    defaults: {
      conventionCalls: ['initialize'],
    },
  });

  for (const iocModule of iocModules) {
    iocModule.registerInContainer(container);
  }

  container.validateDependencies();

  try {
    const bootstrapper = await container.resolveAsync('AppBootstrapper');
    await bootstrapper.start();

    logger.info('Bootstrapper started successfully.');
  } catch(error) {
    logger.error('Bootstrapper failed to start.', error);
  }

  try {

    const routerKeys = container.getKeysByTags('BookstoreRouterTag');

    for (const routerKey of routerKeys) {

      const router = await container.resolveAsync(routerKey);
      router.start();
    }

    const bookstoreServer = await container.resolveAsync('BookstoreServerKey');
    await bookstoreServer.startServer();

  } catch(error) {
    logger.error('Error.', error);
  }
}

start();
