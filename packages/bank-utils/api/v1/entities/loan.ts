export interface Loan {
  creditPolicy: boolean;
  customerId: number;
  delinquencies2Yrs: number;
  daysWithCreditLine: number;
  identifier: number;
  installment: number;
  intRate: number;
  isDefault: boolean;
  purpose: string;
  revolBal: number;
  revolUtil: number;
}
