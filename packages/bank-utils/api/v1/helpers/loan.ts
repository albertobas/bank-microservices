import { type Loan } from '../../v1/entities';

/**
 * Check if an object is an instance of the entity `Loan`.
 * @param obj object to be checked.
 * @returns boolean that represents whether the object is an instance of `Loan`.
 */
export function isInstanceOfLoan(obj: any): obj is Loan {
  return (
    'creditPolicy' in obj &&
    typeof obj.creditPolicy === 'boolean' &&
    'customerId' in obj &&
    typeof obj.customerId === 'number' &&
    'daysWithCreditLine' in obj &&
    typeof obj.daysWithCreditLine === 'number' &&
    'delinquencies2Yrs' in obj &&
    typeof obj.delinquencies2Yrs === 'number' &&
    'identifier' in obj &&
    typeof obj.identifier === 'number' &&
    'installment' in obj &&
    typeof obj.installment === 'number' &&
    'intRate' in obj &&
    typeof obj.intRate === 'number' &&
    'isDefault' in obj &&
    typeof obj.isDefault === 'boolean' &&
    'purpose' in obj &&
    typeof obj.purpose === 'string' &&
    'revolBal' in obj &&
    typeof obj.revolBal === 'number' &&
    'revolUtil' in obj &&
    typeof obj.revolUtil === 'number'
  );
}
