import { Address } from '@graphprotocol/graph-ts';
import { Account, CustomerManagerContract } from '../../generated/types/schema';

export function ensureCustomerManagerContract(addr: Address): CustomerManagerContract {
  let contract = CustomerManagerContract.load(addr);
  if (contract === null) {
    contract = new CustomerManagerContract(addr);
    let account = Account.load(addr);
    if (account === null) {
      account = new Account(addr);
      account.asCustomerManagerContract = addr;
      account.save();
    }
    contract.asAccount = account.id;
    contract.save();
  }
  return contract;
}
