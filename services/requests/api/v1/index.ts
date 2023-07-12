import { join } from 'path';
import { type IWinstonLogger, WinstonLogger } from 'logger';
import { type RouteData, ExpressApi } from 'server';
import { getAllMethod, getByIdentifierMethod } from 'bank-utils/api/v1/methods/request';
import { getAllPath, getPath } from 'bank-utils/api/v1/paths/request';
import {
  getAllRequestsController,
  getRequestByIdentifierController,
  handleInvalidMethodController,
  handleNotFoundController
} from './controllers';
import { RequestsConfigV1 } from './config';

const logger: IWinstonLogger = new WinstonLogger();

const getByIdentifierPath = join(getPath, ':identifier');

const routesData: RouteData[] = [
  // Valid requests
  { method: getAllMethod, path: getAllPath, handler: getAllRequestsController },
  { method: getByIdentifierMethod, path: getByIdentifierPath, handler: getRequestByIdentifierController },
  // Invalid methods
  { method: 'all', path: getAllPath, handler: handleInvalidMethodController, isSync: true },
  { method: 'all', path: getByIdentifierPath, handler: handleInvalidMethodController, isSync: true },
  // Unrecognized URLs
  { method: 'all', path: '*', handler: handleNotFoundController, isSync: true }
];

// const config: Config = { cache: { duration: '5 minutes', onlySuccesses: true } };

async function main(): Promise<void> {
  new ExpressApi(logger, routesData).start(RequestsConfigV1.PORT ?? '3004');
}

main().catch((error) => {
  logger.error(error);
  process.exit(0);
});
