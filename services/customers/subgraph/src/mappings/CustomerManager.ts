import {
  OwnershipTransferred,
  CustomerAdded,
  CustomerUpdated
} from '../generated/types/CustomerManagerDataSource/CustomerManager';
import {
  ensureCustomer,
  ensureCustomerManagerContract,
  registerCustomerAddition,
  registerCustomerUpdate,
  registerOwnershipTransferred
} from '../utils/entities';

export function handleCustomerAdded(event: CustomerAdded): void {
  let customer = ensureCustomer(event.params.identifier, event.address);
  let addition = registerCustomerAddition(event, customer);
  customer.addition = addition.id;
  customer.derogatoryPublicRecs = event.params.derogatoryPublicRecs;
  customer.dti = event.params.dti.toString();
  customer.fico = event.params.fico.toString();
  customer.inquiriesLast6Mths = event.params.inquiriesLast6Mths;
  customer.logAnnualIncome = event.params.logAnnualIncome.toString();
  customer.save();
}

export function handleCustomerUpdated(event: CustomerUpdated): void {
  let customer = ensureCustomer(event.params.identifier, event.address);
  let update = registerCustomerUpdate(event, customer);
  customer.derogatoryPublicRecs = event.params.derogatoryPublicRecs;
  customer.dti = event.params.dti.toString();
  customer.inquiriesLast6Mths = event.params.inquiriesLast6Mths;
  customer.fico = event.params.fico.toString();
  customer.logAnnualIncome = event.params.logAnnualIncome.toString();
  customer.update = update.id;
  customer.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let contract = ensureCustomerManagerContract(event.address);
  let transfer = registerOwnershipTransferred(event, event.params.previousOwner, event.params.newOwner);
  contract.owner = transfer.owner;
  contract.save();
}
