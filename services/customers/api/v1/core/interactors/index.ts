import CustomerDataSource from '../../data-sources/customer.data-source';
import createCustomer from './create-customer.interactor';
import deleteCustomerByIdentifier from './delete-customer-by-identifier.interactor';
import getCustomerByIdentifier from './get-customer-by-identifier.interactor';
import getAllCustomers from './get-all-customers.interactor';
import handleInvalidMethod from './handle-invalid-method.interactor';
import handleNotFound from './handle-not-found.interactor';
import updateCustomer from './update-customer.interactor';

const customerRepository = new CustomerDataSource();

const createCustomerWithDep = createCustomer(customerRepository);
const deleteCustomerByIdentifierWithDep = deleteCustomerByIdentifier(customerRepository);
const getCustomerByIdentifierWithDep = getCustomerByIdentifier(customerRepository);
const getAllCustomersWithDep = getAllCustomers(customerRepository);
const handleInvalidMethodWithDep = handleInvalidMethod(customerRepository);
const handleNotFoundWithDep = handleNotFound(customerRepository);
const updateCustomerWithDep = updateCustomer(customerRepository);

export {
  createCustomerWithDep,
  deleteCustomerByIdentifierWithDep,
  getCustomerByIdentifierWithDep,
  getAllCustomersWithDep,
  handleInvalidMethodWithDep,
  handleNotFoundWithDep,
  updateCustomerWithDep
};
