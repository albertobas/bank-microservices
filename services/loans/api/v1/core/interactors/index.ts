import LoanDataSource from '../../data-sources/loan.data-source';
import createLoan from './create-loan.interactor';
import deleteLoan from './delete-loan-by-identifier.interactor';
import getLoanById from './get-loan-by-identifier.interactor';
import getAllLoans from './get-all-loans.interactor';
import handleInvalidMethod from './handle-invalid-method.interactor';
import updateLoan from './update-loan.interactor';
import handleNotFound from './handle-not-found.interactor';

const loanRepository = new LoanDataSource();

const createLoanWithDep = createLoan(loanRepository);
const deleteLoanByIdWithDep = deleteLoan(loanRepository);
const getLoanByIdWithDep = getLoanById(loanRepository);
const getAllLoansWithDep = getAllLoans(loanRepository);
const handleInvalidMethodWithDep = handleInvalidMethod(loanRepository);
const handleNotFoundWithDep = handleNotFound(loanRepository);
const updateLoanWithDep = updateLoan(loanRepository);

export {
  createLoanWithDep,
  deleteLoanByIdWithDep,
  getLoanByIdWithDep,
  getAllLoansWithDep,
  handleInvalidMethodWithDep,
  handleNotFoundWithDep,
  updateLoanWithDep
};
