import { type Account } from '../../v1/entities';

/**
 * Check if an object is an instance of the entity `Account`.
 * @param obj object to be checked.
 * @returns boolean that represents whether the object is an instance of `Account`.
 */
export function isInstanceOfAccount(obj: any): obj is Account {
  return (
    'number' in obj &&
    typeof obj.number === 'number' &&
    'customerId' in obj &&
    typeof obj.customerId === 'number' &&
    'type' in obj &&
    typeof obj.type === 'string' &&
    'currency' in obj &&
    typeof obj.currency === 'string' &&
    'balance' in obj &&
    typeof obj.balance === 'number'
  );
}
