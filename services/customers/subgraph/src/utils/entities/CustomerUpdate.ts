import { ethereum } from '@graphprotocol/graph-ts';
import { CustomerUpdate, Customer } from '../../generated/types/schema';
import { eventId } from '../helpers';
import { registerTransaction } from './Transaction';

export function registerCustomerUpdate(event: ethereum.Event, customer: Customer): CustomerUpdate {
  let id = eventId(event.transaction.hash, event.logIndex, null);
  let transaction = registerTransaction(event.transaction.hash, event.block.timestamp, event.block.number);
  let update = new CustomerUpdate(id);
  update.contract = customer.contract;
  update.customer = customer.id;
  update.emitter = customer.contract;
  update.timestamp = event.block.timestamp;
  update.transaction = transaction.id;
  update.save();
  return update;
}
