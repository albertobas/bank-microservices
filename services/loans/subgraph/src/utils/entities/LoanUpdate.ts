import { ethereum } from '@graphprotocol/graph-ts';
import { Loan, LoanUpdate } from '../../generated/types/schema';
import { eventId } from '../helpers';
import { registerTransaction } from './Transaction';

export function registerLoanUpdate(event: ethereum.Event, loan: Loan): LoanUpdate {
  let id = eventId(event.transaction.hash, event.logIndex, null);
  let transaction = registerTransaction(event.transaction.hash, event.block.timestamp, event.block.number);
  let update = new LoanUpdate(id);
  update.contract = loan.contract;
  update.emitter = loan.contract;
  update.loan = loan.id;
  update.timestamp = event.block.timestamp;
  update.transaction = transaction.id;
  update.save();
  return update;
}
