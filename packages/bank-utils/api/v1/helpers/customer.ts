import { type Customer } from '../../v1/entities';

/**
 * Check if an object is an instance of the entity `Customer`.
 * @param obj object to be checked.
 * @returns boolean that represents whether the object is an instance of `Customer`.
 */
export function isInstanceOfCustomer(obj: any): obj is Customer {
  return (
    'derogatoryPublicRecs' in obj &&
    typeof obj.derogatoryPublicRecs === 'number' &&
    'dti' in obj &&
    typeof obj.dti === 'number' &&
    'identifier' in obj &&
    typeof obj.identifier === 'number' &&
    'inquiriesLast6Mths' in obj &&
    typeof obj.inquiriesLast6Mths === 'number' &&
    'fico' in obj &&
    typeof obj.fico === 'number' &&
    'logAnnualIncome' in obj &&
    typeof obj.logAnnualIncome === 'number'
  );
}
