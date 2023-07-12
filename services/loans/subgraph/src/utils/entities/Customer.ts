import { Address, BigInt } from '@graphprotocol/graph-ts';
import { Customer } from '../../generated/types/schema';
import { ensureAccount } from './Account';
import { ensureLoanManagerContract } from './LoanManagerContract';

export function ensureCustomer(customerId: BigInt, address: Address): Customer {
  let contract = ensureLoanManagerContract(address);
  let id = customerId.toString();
  let customer = Customer.load(id);
  if (customer === null) {
    let account = ensureAccount(address);
    customer = new Customer(id);
    customer.contract = contract.id;
    customer.save();
    account.asLoanManagerContract = contract.id;
    account.save();
  }
  return customer;
}
