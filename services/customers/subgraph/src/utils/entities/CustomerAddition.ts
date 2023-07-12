import { ethereum } from '@graphprotocol/graph-ts';
import { CustomerAddition, Customer } from '../../generated/types/schema';
import { eventId } from '../helpers';
import { registerTransaction } from './Transaction';

export function registerCustomerAddition(event: ethereum.Event, customer: Customer): CustomerAddition {
  let id = eventId(event.transaction.hash, event.logIndex, null);
  let transaction = registerTransaction(event.transaction.hash, event.block.timestamp, event.block.number);
  let addition = new CustomerAddition(id);
  addition.contract = customer.contract;
  addition.customer = customer.id;
  addition.emitter = customer.contract;
  addition.timestamp = event.block.timestamp;
  addition.transaction = transaction.id;
  addition.save();
  return addition;
}
