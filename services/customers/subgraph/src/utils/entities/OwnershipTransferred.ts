import { Address, ethereum } from '@graphprotocol/graph-ts';
import { OwnershipTransferred } from '../../generated/types/schema';
import { ensureAccount } from './Account';
import { registerTransaction } from './Transaction';
import { ensureCustomerManagerContract } from './CustomerManagerContract';
import { eventId } from '../helpers';

export function registerOwnershipTransferred(
  event: ethereum.Event,
  previousOwnerAddress: Address,
  newOwnerAddress: Address
): OwnershipTransferred {
  let id = eventId(event.transaction.hash, event.logIndex, null);
  let transfer = new OwnershipTransferred(id);
  let emitterAccount = ensureAccount(event.address);
  let previousOwnerAccount = ensureAccount(previousOwnerAddress);
  let newOwnerAccount = ensureAccount(newOwnerAddress);
  let transaction = registerTransaction(event.transaction.hash, event.block.timestamp, event.block.number);
  let contract = ensureCustomerManagerContract(event.address);
  transfer.contract = contract.id;
  transfer.emitter = emitterAccount.id;
  transfer.owner = newOwnerAccount.id;
  transfer.previousOwner = previousOwnerAccount.id;
  transfer.timestamp = event.block.timestamp;
  transfer.transaction = transaction.id;
  transfer.save();
  return transfer;
}
