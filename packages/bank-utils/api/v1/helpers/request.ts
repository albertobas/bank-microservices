import { type Request } from '../../v1/entities';

/**
 * Check if an object is an instance of the entity `Request`.
 * @param obj object to be checked.
 * @returns boolean that represents whether the object is an instance of `Customer`.
 */
export function isInstanceOfRequest(obj: any): obj is Request {
  return (
    'identifier' in obj &&
    typeof obj.identifier === 'number' &&
    'accountNumber' in obj &&
    typeof obj.accountNumber === 'number' &&
    'serviceId' in obj &&
    typeof obj.serviceId === 'string' &&
    'servicePurpose' in obj &&
    typeof obj.servicePurpose === 'string' &&
    'timestamp' in obj &&
    typeof obj.timestamp === 'number'
  );
}
