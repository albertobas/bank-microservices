import RequestDataSource from '../../data-sources/request.data-source';
import getAllRequests from './get-all-requests.interactor';
import getRequestByIdentifier from './get-request-by-identifier.interactor';
import handleInvalidMethod from './handle-invalid-method.interactor';
import handleNotFound from './handle-not-found.interactor';

const requestRepository = new RequestDataSource();

const getAllRequestsWithDep = getAllRequests(requestRepository);
const getRequestByIdentifierWithDep = getRequestByIdentifier(requestRepository);
const handleInvalidMethodWithDep = handleInvalidMethod(requestRepository);
const handleNotFoundWithDep = handleNotFound(requestRepository);

export { getAllRequestsWithDep, getRequestByIdentifierWithDep, handleInvalidMethodWithDep, handleNotFoundWithDep };
