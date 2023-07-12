import { ethereum } from '@graphprotocol/graph-ts';
import { Loan, LoanAddition } from '../../generated/types/schema';
import { eventId } from '../helpers';
import { registerTransaction } from './Transaction';

export function registerLoanAddition(event: ethereum.Event, loan: Loan): LoanAddition {
  let id = eventId(event.transaction.hash, event.logIndex, null);
  let transaction = registerTransaction(event.transaction.hash, event.block.timestamp, event.block.number);
  let addition = new LoanAddition(id);
  addition.contract = loan.contract;
  addition.emitter = loan.contract;
  addition.loan = loan.id;
  addition.timestamp = event.block.timestamp;
  addition.transaction = transaction.id;
  addition.save();
  return addition;
}
