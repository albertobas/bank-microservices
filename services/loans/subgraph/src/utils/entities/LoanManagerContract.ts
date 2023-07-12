import { Address } from '@graphprotocol/graph-ts';
import { Account, LoanManagerContract } from '../../generated/types/schema';

export function ensureLoanManagerContract(addr: Address): LoanManagerContract {
  let contract = LoanManagerContract.load(addr);
  if (contract === null) {
    contract = new LoanManagerContract(addr);
    let account = Account.load(addr);
    if (account === null) {
      account = new Account(addr);
      account.asLoanManagerContract = addr;
      account.save();
    }
    contract.asAccount = account.id;
    contract.save();
  }
  return contract;
}
