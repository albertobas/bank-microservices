import { BigInt, Bytes } from '@graphprotocol/graph-ts';
import { separator } from './constants';

export function eventId(transactionHash: Bytes, logIndex: BigInt, id: string | null): string {
  if (id === null) {
    return transactionHash.toHex().concat(separator).concat(logIndex.toString());
  } else {
    return transactionHash
      .toHex()
      .concat(separator)
      .concat(logIndex.toString())
      .concat(separator)
      .concat(id.toString());
  }
}
