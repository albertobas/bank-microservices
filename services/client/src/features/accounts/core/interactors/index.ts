import AccountsDataSource from '../../data-sources/account.data-source';
import createAccount from './create-account.interactor';
import deleteAccountByNumber from './delete-account-by-number.interactor';
import depositToAccount from './deposit-to-account.interactor';
import getAccountByNumber from './get-account-by-number.interactor';
import getAllAccounts from './get-all-accounts.interactor';
import updateAccount from './update-account.interactor';
import withdrawFromAccount from './withdraw-from-account.interactor';

const accountsRepository = new AccountsDataSource();

const createAccountWithDep = createAccount(accountsRepository);
const deleteAccountByNumberWithDep = deleteAccountByNumber(accountsRepository);
const depositToAccountWithDep = depositToAccount(accountsRepository);
const getAccountByNumberWithDep = getAccountByNumber(accountsRepository);
const getAllAccountsWithDep = getAllAccounts(accountsRepository);
const updateAccountWithDep = updateAccount(accountsRepository);
const withdrawFromAccountWithDep = withdrawFromAccount(accountsRepository);

export {
  createAccountWithDep,
  deleteAccountByNumberWithDep,
  depositToAccountWithDep,
  getAccountByNumberWithDep,
  getAllAccountsWithDep,
  updateAccountWithDep,
  withdrawFromAccountWithDep
};
