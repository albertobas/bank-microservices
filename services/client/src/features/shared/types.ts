import { Customer, Loan } from 'bank-utils/api/v1/entities';

export type LoanDefault = Omit<Loan, 'customerId' | 'isDefault' | 'identifier'> & Omit<Customer, 'identifier'>;
