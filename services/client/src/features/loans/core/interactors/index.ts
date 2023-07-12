import LoansDataSource from '../../data-sources/loan.data-source';
import createLoan from './create-loan.interactor';
import deleteLoanByIdentifier from './delete-loan-by-identifier.interactor';
import getAllLoans from './get-all-loans.interactor';
import getLoanByIdentifier from './get-loan-by-identifier.interactor';
import requestLoanDefaultPrediction from './request-loan-default-prediction.interactor';
import updateLoan from './update-loan.interactor';

const loansRepository = new LoansDataSource();

const createLoanWithDep = createLoan(loansRepository);
const deleteLoanByIdentifierWithDep = deleteLoanByIdentifier(loansRepository);
const getLoanByIdentifierWithDep = getLoanByIdentifier(loansRepository);
const getAllLoansWithDep = getAllLoans(loansRepository);
const requestLoanDefaultPredictionWithDep = requestLoanDefaultPrediction(loansRepository);
const updateLoanWithDep = updateLoan(loansRepository);

export {
  createLoanWithDep,
  deleteLoanByIdentifierWithDep,
  getLoanByIdentifierWithDep,
  getAllLoansWithDep,
  requestLoanDefaultPredictionWithDep,
  updateLoanWithDep
};
