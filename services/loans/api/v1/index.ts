import { join } from 'path';
import { type IWinstonLogger, WinstonLogger } from 'logger';
import { type RouteData, ExpressApi } from 'server';
import {
  createMethod,
  deleteByIdentifierMethod,
  getAllMethod,
  getByIdentifierMethod,
  updateMethod
} from 'bank-utils/api/v1/methods/loan';
import { createPath, deletePath, getAllPath, getPath, updatePath } from 'bank-utils/api/v1/paths/loan';
import {
  createLoanController,
  deleteLoanByIdentifierController,
  getAllLoansController,
  getLoanByIdController,
  handleInvalidMethodController,
  handleNotFoundController,
  updateLoanController
} from './controllers';
import { LoansConfigV1 } from './config';

const logger: IWinstonLogger = new WinstonLogger();

const deleteByIdPath = join(deletePath, ':identifier');
const getByIdPath = join(getPath, ':identifier');

const routesData: RouteData[] = [
  // Valid requests
  { method: createMethod, path: createPath, handler: createLoanController },
  { method: deleteByIdentifierMethod, path: deleteByIdPath, handler: deleteLoanByIdentifierController },
  { method: getAllMethod, path: getAllPath, handler: getAllLoansController },
  { method: getByIdentifierMethod, path: getByIdPath, handler: getLoanByIdController },
  { method: updateMethod, path: updatePath, handler: updateLoanController },
  // Invalid methods
  { method: 'all', path: createPath, handler: handleInvalidMethodController, isSync: true },
  { method: 'all', path: deleteByIdPath, handler: handleInvalidMethodController, isSync: true },
  { method: 'all', path: getAllPath, handler: handleInvalidMethodController, isSync: true },
  { method: 'all', path: getByIdPath, handler: handleInvalidMethodController, isSync: true },
  { method: 'all', path: updatePath, handler: handleInvalidMethodController, isSync: true },
  // Unrecognized URLs
  { method: 'all', path: '*', handler: handleNotFoundController, isSync: true }
];

// const config: Config = {
//   cache: { duration: '5 minutes', onlySuccesses: true },
//   cors: {
//     origin: `http://localhost:${LoansConfigV1.CLIENT_PORT ?? 3000}`,
//     optionsSuccessStatus: 200
//   }
// };

async function main(): Promise<void> {
  new ExpressApi(logger, routesData).start(LoansConfigV1.PORT ?? '3003');
}

main().catch((error) => {
  logger.error(error);
  process.exit(0);
});
