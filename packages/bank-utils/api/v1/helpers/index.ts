export * from './account';
export * from './customer';
export * from './loan';
export * from './request';

export const accountBadRequestMessage = 'The object passed in the body is not an instance of Account';
export const customerBadRequestMessage = 'The object passed in the body is not an instance of Customer';
export const amountBadRequestMessage = '"amount" has to be a number';
export const amountNumberBadRequestMessage = '"amount" and "number" have to be a number';
export const idBadRequestMessage = '"id" has to be an integer number';
export const identifierBadRequestMessage = '"identifier" has to be an integer number';
export const loanBadRequestMessage = 'The object passed in the body is not an instance of Loan';
export const numberBadRequestMessage = '"number" has to be an integer number';
export const requestBadRequestMessage = 'The object passed in the body is not an instance of Request';
export const clientClosingErrorMessage =
  'An error ocurred while closing the mongo client and its underlying connections';

export const errorMessage = 'There has been an error.';
