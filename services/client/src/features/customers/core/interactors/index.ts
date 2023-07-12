import CustomersDataSource from '../../data-sources/customer.data-source';
import createCustomer from './create-customer.interactor';
import deleteCustomerByIdentifier from './delete-customer-by-identifier.interactor';
import getCustomerByIdentifier from './get-customer-by-identifier.interactor';
import getAllCustomers from './get-all-customers.interactor';
import updateCustomer from './update-customer.interactor';

const customersRepository = new CustomersDataSource();

const createCustomerWithDep = createCustomer(customersRepository);
const deleteCustomerByIdentifierWithDep = deleteCustomerByIdentifier(customersRepository);
const getCustomerByIdentifierWithDep = getCustomerByIdentifier(customersRepository);
const getAllCustomersWithDep = getAllCustomers(customersRepository);
const updateCustomerWithDep = updateCustomer(customersRepository);

export {
  createCustomerWithDep,
  deleteCustomerByIdentifierWithDep,
  getCustomerByIdentifierWithDep,
  getAllCustomersWithDep,
  updateCustomerWithDep
};
