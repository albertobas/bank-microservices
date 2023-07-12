import { Address, BigInt } from '@graphprotocol/graph-ts';
import { Loan } from '../../generated/types/schema';
import { ensureAccount } from './Account';
import { ensureLoanManagerContract } from './LoanManagerContract';

export function ensureLoan(loanId: BigInt, address: Address, timestamp: BigInt): Loan {
  let contract = ensureLoanManagerContract(address);
  let id = loanId.toString();
  let loan = Loan.load(id);
  if (loan === null) {
    let account = ensureAccount(address);
    loan = new Loan(id);
    loan.contract = contract.id;
    loan.creationDate = timestamp;
    loan.save();
    account.asLoanManagerContract = contract.id;
    account.save();
  }
  return loan;
}
