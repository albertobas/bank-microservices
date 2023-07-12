import { join } from 'path';
import { type IWinstonLogger, WinstonLogger } from 'logger';
import { type RouteData, ExpressApi } from 'server';
import {
  createMethod,
  deleteByIdentifierMethod,
  getAllMethod,
  getByIdentifierMethod,
  updateMethod
} from 'bank-utils/api/v1/methods/customer';
import { createPath, deletePath, getAllPath, getPath, updatePath } from 'bank-utils/api/v1/paths/customer';
import {
  createCustomerController,
  deleteCustomerByIdentifierController,
  getAllCustomersController,
  getCustomerByIdentifierController,
  handleInvalidMethodController,
  handleNotFoundController,
  updateCustomerController
} from './controllers';
import { CustomersConfigV1 } from './config';

const logger: IWinstonLogger = new WinstonLogger();

const deleteByIdentifierPath = join(deletePath, ':identifier');
const getByIdentifierPath = join(getPath, ':identifier');

const routesData: RouteData[] = [
  // Valid requests
  { method: createMethod, path: createPath, handler: createCustomerController },
  { method: deleteByIdentifierMethod, path: deleteByIdentifierPath, handler: deleteCustomerByIdentifierController },
  { method: getAllMethod, path: getAllPath, handler: getAllCustomersController },
  { method: getByIdentifierMethod, path: getByIdentifierPath, handler: getCustomerByIdentifierController },
  { method: updateMethod, path: updatePath, handler: updateCustomerController },
  // Invalid methods
  { method: 'all', path: createPath, handler: handleInvalidMethodController, isSync: true },
  { method: 'all', path: deleteByIdentifierPath, handler: handleInvalidMethodController, isSync: true },
  { method: 'all', path: getAllPath, handler: handleInvalidMethodController, isSync: true },
  { method: 'all', path: getByIdentifierPath, handler: handleInvalidMethodController, isSync: true },
  { method: 'all', path: updatePath, handler: handleInvalidMethodController, isSync: true },
  // Unrecognized URLs
  { method: 'all', path: '*', handler: handleNotFoundController, isSync: true }
];

// const config: Config = { cache: { duration: '5 minutes', onlySuccesses: true } };

async function main(): Promise<void> {
  new ExpressApi(logger, routesData).start(CustomersConfigV1.PORT ?? '3002');
}

main().catch((error) => {
  logger.error(error);
  process.exit(0);
});
