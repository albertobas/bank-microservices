import AccountDataSource from '../../data-sources/account.data-source';
import createAccount from './create-account.interactor';
import deleteAccountByNumber from './delete-account-by-number.interactor';
import depositToAccount from './deposit-to-account.interactor';
import getAccountByNumber from './get-account-by-number.interactor';
import getAllAccounts from './get-all-accounts.interactor';
import handleInvalidMethod from './handle-invalid-method.interactor';
import handleNotFound from './handle-not-found.interactor';
import updateAccount from './update-account.interactor';
import withdrawFromAccount from './withdraw-from-account.interactor';

const accountRepository = new AccountDataSource();

const createAccountWithDep = createAccount(accountRepository);
const deleteAccountByNumberWithDep = deleteAccountByNumber(accountRepository);
const depositToAccountWithDep = depositToAccount(accountRepository);
const getAccountByNumberWithDep = getAccountByNumber(accountRepository);
const getAllAccountsWithDep = getAllAccounts(accountRepository);
const handleInvalidMethodWithDep = handleInvalidMethod(accountRepository);
const handleNotFoundWithDep = handleNotFound(accountRepository);
const updateAccountWithDep = updateAccount(accountRepository);
const withdrawFromAccountWithDep = withdrawFromAccount(accountRepository);

export {
  createAccountWithDep,
  deleteAccountByNumberWithDep,
  depositToAccountWithDep,
  getAccountByNumberWithDep,
  getAllAccountsWithDep,
  handleInvalidMethodWithDep,
  handleNotFoundWithDep,
  updateAccountWithDep,
  withdrawFromAccountWithDep
};
