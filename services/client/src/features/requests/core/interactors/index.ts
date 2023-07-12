import RequestsDataSource from '../../data-sources/request.data-source';
import getRequestByIdentifier from './get-request-by-identifier.interactor';
import getAllRequests from './get-all-requests.interactor';

const requestsRepository = new RequestsDataSource();

const getRequestByIdentifierWithDep = getRequestByIdentifier(requestsRepository);
const getAllRequestsWithDep = getAllRequests(requestsRepository);

export { getRequestByIdentifierWithDep, getAllRequestsWithDep };
