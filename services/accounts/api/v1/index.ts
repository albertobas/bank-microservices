import { join } from 'path';
import { type IWinstonLogger, WinstonLogger } from 'logger';
import { type RouteData, ExpressApi } from 'server';
import {
  createMethod,
  deleteByNumberMethod,
  depositMethod,
  getAllMethod,
  getByNumberMethod,
  updateMethod,
  withdrawMethod
} from 'bank-utils/api/v1/methods/account';
import {
  createPath,
  deletePath,
  depositPath,
  getAllPath,
  getPath,
  updatePath,
  withdrawPath
} from 'bank-utils/api/v1/paths/account';
import {
  createAccountController,
  deleteAccountByNumberController,
  depositToAccountController,
  getAccountByNumberController,
  getAllAccountsController,
  handleInvalidMethodController,
  handleNotFoundController,
  updateAccountController,
  withdrawFromAccountController
} from './controllers';
import { AccountsConfigV1 } from './config';

const logger: IWinstonLogger = new WinstonLogger();

const deleteByNumberPath = join(deletePath, ':number');
const getByNumberPath = join(getPath, ':number');

const routesData: RouteData[] = [
  // Valid requests
  { method: createMethod, path: createPath, handler: createAccountController },
  { method: deleteByNumberMethod, path: deleteByNumberPath, handler: deleteAccountByNumberController },
  { method: depositMethod, path: depositPath, handler: depositToAccountController },
  { method: getAllMethod, path: getAllPath, handler: getAllAccountsController },
  { method: getByNumberMethod, path: getByNumberPath, handler: getAccountByNumberController },
  { method: updateMethod, path: updatePath, handler: updateAccountController },
  { method: withdrawMethod, path: withdrawPath, handler: withdrawFromAccountController },
  // Invalid methods
  { method: 'all', path: createPath, handler: handleInvalidMethodController, isSync: true },
  { method: 'all', path: deleteByNumberPath, handler: handleInvalidMethodController, isSync: true },
  { method: 'all', path: depositPath, handler: handleInvalidMethodController, isSync: true },
  { method: 'all', path: getAllPath, handler: handleInvalidMethodController, isSync: true },
  { method: 'all', path: getByNumberPath, handler: handleInvalidMethodController, isSync: true },
  { method: 'all', path: updatePath, handler: handleInvalidMethodController, isSync: true },
  { method: 'all', path: withdrawPath, handler: handleInvalidMethodController, isSync: true },
  // Unrecognized URLs
  { method: 'all', path: '*', handler: handleNotFoundController, isSync: true }
];

// const config: Config = { cache: { duration: '5 minutes', onlySuccesses: true } };

async function main(): Promise<void> {
  new ExpressApi(logger, routesData).start(AccountsConfigV1.PORT ?? '3001');
}

main().catch((error) => {
  logger.error(error);
  process.exit(0);
});
