import type CustomerRepository from '../core/repositories/customer.repository';
import { type Customer } from 'bank-utils/api/v1/entities/customer';
import { type Collection, MongoClient } from 'mongodb';
import { WinstonLogger, type IWinstonLogger } from 'logger';
import { CustomersConfigV1 } from '../config';

const DB_URI = CustomersConfigV1.DB_URI;
const DB_PORT = CustomersConfigV1.DB_PORT;
const DB_USER = CustomersConfigV1.DB_USER;
const DB_PASSWORD = CustomersConfigV1.DB_PASSWORD;
const COLLECTION = CustomersConfigV1.COLLECTION;

class CustomerDataSource implements CustomerRepository {
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

  public async create({ identifier, ...rest }: Customer): Promise<void> {
    const customers = this.getCollection();
    const customer = await customers.findOne<Customer>({ identifier });
    if (customer !== null) {
      throw new Error(`There is already a customer with the identifier: ${identifier}`);
    }
    await customers.insertOne({ identifier, ...rest });
  }

  public async deleteByIdentifier(identifier: number): Promise<void> {
    const customers = this.getCollection();
    const result = await customers.deleteOne({ identifier });
    if (result.deletedCount !== 1) {
      throw new Error(`Could not find customer with the identifier: ${identifier}`);
    }
  }

  public async getAll(): Promise<Customer[]> {
    const customers = this.getCollection();
    const cursor = customers.find<Customer>({}, { projection: { _id: 0 } });
    if ((await customers.countDocuments()) === 0) {
      this.log('warn', 'No customers found');
    }
    const customersArray = await cursor.toArray();
    return customersArray;
  }

  public async getByIdentifier(identifier: number): Promise<Customer> {
    const customers = this.getCollection();
    const customer = await customers.findOne<Customer>({ identifier }, { projection: { _id: 0 } });
    if (customer != null) {
      return customer;
    }
    throw new Error(`Could not find customer with the identifier: ${identifier}`);
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

  public async update({ identifier, ...rest }: Customer): Promise<void> {
    const customers = this.getCollection();
    await customers.updateOne({ identifier }, { $set: { identifier, ...rest } });
  }

  /**
   * Get a reference to a MongoDB Collection.
   * @returns a reference to a MongoDB Collection of customers.
   */
  private getCollection(): Collection<Customer> {
    if (this.client !== null) {
      if (typeof COLLECTION === 'undefined') {
        throw new Error('Cound not read configuration data');
      }
      return this.client.db().collection(COLLECTION);
    }
    throw new Error('There is no instance to Mongo client, please connect the repository first.');
  }
}

export default CustomerDataSource;
