import type RequestRepository from '../core/repositories/request.repository';
import { type Request } from 'bank-utils/api/v1/entities/request';
import { type Collection, MongoClient } from 'mongodb';
import { WinstonLogger, type IWinstonLogger } from 'logger';
import { RequestsConfigV1 } from '../config';

const DB_URI = RequestsConfigV1.DB_URI;
const DB_PORT = RequestsConfigV1.DB_PORT;
const DB_USER = RequestsConfigV1.DB_USER;
const DB_PASSWORD = RequestsConfigV1.DB_PASSWORD;
const COLLECTION = RequestsConfigV1.COLLECTION;

class RequestDataSource implements RequestRepository {
  private client: MongoClient | null;
  private readonly logger: IWinstonLogger;

  constructor() {
    this.client = null;
    this.logger = new WinstonLogger();
  }

  public async connect(): Promise<void> {
    if (
      typeof DB_PORT === 'undefined' ||
      typeof DB_USER === 'undefined' ||
      typeof DB_PASSWORD === 'undefined' ||
      typeof DB_URI === 'undefined'
    ) {
      throw new Error('Cound not read configuration data');
    }
    const URI =
      typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'development'
        ? `mongodb://localhost:${DB_PORT}`
        : DB_URI;
    this.client = new MongoClient(URI, { auth: { username: DB_USER, password: DB_PASSWORD } });
    await this.client.connect();
  }

  public async close(): Promise<void> {
    if (this.client !== null) {
      await this.client.close();
      this.client = null;
    }
  }

  public async getAll(): Promise<Request[]> {
    const requests = this.getCollection();
    const cursor = requests.find<Request>({}, { projection: { _id: 0 } });
    if ((await requests.countDocuments()) === 0) {
      this.log('warn', 'No requests found');
    }
    const requestsArray = await cursor.toArray();
    return requestsArray;
  }

  public async getByIdentifier(identifier: number): Promise<Request> {
    const requests = this.getCollection();
    const request = await requests.findOne<Request>({ identifier }, { projection: { _id: 0 } });
    if (request != null) {
      return request;
    }
    throw new Error(`Could not find request with identifier: ${identifier}`);
  }

  public log(type: 'info' | 'warn' | 'error', message: any): void {
    if (type === 'info') {
      this.logger.info(message);
    } else if (type === 'warn') {
      this.logger.warn(message);
    } else {
      this.logger.error(message);
    }
  }

  /**
   * Get a reference to a MongoDB Collection.
   * @returns a reference to a MongoDB Collection of requests.
   */
  private getCollection(): Collection<Request> {
    if (this.client !== null) {
      if (typeof COLLECTION === 'undefined') {
        throw new Error('Cound not read configuration data');
      }
      return this.client.db().collection(COLLECTION);
    }
    throw new Error('There is no instance to Mongo client, please connect the repository first.');
  }
}

export default RequestDataSource;
