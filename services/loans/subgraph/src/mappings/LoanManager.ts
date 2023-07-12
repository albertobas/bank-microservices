import { OwnershipTransferred, LoanAdded, LoanUpdated } from '../generated/types/LoanManagerDataSource/LoanManager';
import {
  ensureLoanManagerContract,
  ensureLoan,
  registerLoanAddition,
  registerLoanUpdate,
  registerOwnershipTransferred
} from '../utils/entities';

export function handleLoanAdded(event: LoanAdded): void {
  let loan = ensureLoan(event.params.identifier, event.address, event.block.timestamp);
  let addition = registerLoanAddition(event, loan);
  loan.addition = addition.id;
  loan.customer = event.params.customerId;
  loan.installment = event.params.installment.toString();
  loan.intRate = event.params.intRate.toString();
  loan.isDefault = event.params.isDefault;
  loan.purpose = event.params.purpose.toString();
  loan.delinquencies2Yrs = event.params.delinquencies2Yrs;
  loan.save();
}

export function handleLoanUpdated(event: LoanUpdated): void {
  let loan = ensureLoan(event.params.identifier, event.address, event.block.timestamp);
  let update = registerLoanUpdate(event, loan);
  loan.installment = event.params.installment.toString();
  loan.intRate = event.params.intRate.toString();
  loan.isDefault = event.params.isDefault;
  loan.purpose = event.params.purpose.toString();
  loan.delinquencies2Yrs = event.params.delinquencies2Yrs;
  loan.update = update.id;
  loan.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let contract = ensureLoanManagerContract(event.address);
  let transfer = registerOwnershipTransferred(event, event.params.previousOwner, event.params.newOwner);
  contract.owner = transfer.owner;
  contract.save();
}
