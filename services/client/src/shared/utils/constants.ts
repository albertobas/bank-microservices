import * as yup from 'yup';

export const brandName = 'Bank Microservices';

export const pages = {
  ACCOUNTS: { title: 'Accounts', url: '/accounts' },
  CUSTOMERS: { title: 'Customers', url: '/customers' },
  HOME: { title: 'Home', url: '/' },
  LOANS: { title: 'Loans', url: '/loans' },
  REQUESTS: { title: 'Requests', url: '/requests' }
};

export const accountSchema = yup
  .object({
    number: yup.number().min(0).integer().required(),
    customerId: yup.number().min(0).integer().required(),
    type: yup.string().required(),
    currency: yup.string().required(),
    balance: yup.number().min(0.01).required()
  })
  .required();

export const customerSchema = yup
  .object({
    identifier: yup.number().min(0).integer().required(),
    derogatoryPublicRecs: yup.number().min(0).integer().required(),
    dti: yup.number().min(0).required(),
    inquiriesLast6Mths: yup.number().min(0).integer().required(),
    fico: yup.number().min(0).integer().required(),
    logAnnualIncome: yup.number().positive().required()
  })
  .required();

export const loanSchema = yup
  .object({
    creditPolicy: yup.boolean().required(),
    customerId: yup.number().min(0).integer().required(),
    delinquencies2Yrs: yup.number().min(0).integer().required(),
    daysWithCreditLine: yup.number().min(0).required(),
    identifier: yup.number().min(0).integer().required(),
    installment: yup.number().min(0.01).required(),
    intRate: yup.number().min(0.01).required(),
    isDefault: yup.boolean().required(),
    purpose: yup.string().required(),
    revolBal: yup.number().positive().required(),
    revolUtil: yup.number().positive().required()
  })
  .required();

export const identifierSchema = yup
  .object({
    identifier: yup.number().min(0).integer().required()
  })
  .required();

export const numberSchema = yup
  .object({
    number: yup.number().min(0).integer().required()
  })
  .required();

export const amountNumberSchema = yup
  .object({
    number: yup.number().min(0).integer().required(),
    amount: yup.number().min(0.01).required()
  })
  .required();
