import type AccountRepository from '../core/repositories/account.repository';
import { type Account } from 'bank-utils/api/v1/entities/account';
import { type Collection, MongoClient } from 'mongodb';
import { WinstonLogger, type IWinstonLogger } from 'logger';
import { AccountsConfigV1 } from '../config';

const DB_URI = AccountsConfigV1.DB_URI;
const DB_PORT = AccountsConfigV1.DB_PORT;
const DB_USER = AccountsConfigV1.DB_USER;
const DB_PASSWORD = AccountsConfigV1.DB_PASSWORD;
const COLLECTION = AccountsConfigV1.COLLECTION;

class AccountDataSource implements AccountRepository {
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

  public async create({ number, ...rest }: Account): Promise<void> {
    const accounts = this.getCollection();
    const account = await accounts.findOne<Account>({ number });
    if (account !== null) {
      throw new Error(`There is already an account with the number: ${number}`);
    }
    await accounts.insertOne({ number, ...rest });
  }

  public async deleteByNumber(number: number): Promise<void> {
    const accounts = this.getCollection();
    const result = await accounts.deleteOne({ number });
    if (result.deletedCount !== 1) {
      throw new Error(`Could not find account with number: ${number}`);
    }
  }

  public async deposit(number: number, amount: number): Promise<void> {
    const accounts = this.getCollection();
    const account = await accounts.findOne<Account>({ number });
    if (account !== null) {
      const balance = account.balance + amount;
      await accounts.findOneAndUpdate({ number }, { $set: { balance } });
    } else {
      throw new Error(`Could not find account with number: ${number}`);
    }
  }

  public async getAll(): Promise<Account[]> {
    const accounts = this.getCollection();
    const cursor = accounts.find<Account>({}, { projection: { _id: 0 } });
    if ((await accounts.countDocuments()) === 0) {
      this.log('warn', 'No accounts found');
    }
    const accountsArray = await cursor.toArray();
    return accountsArray;
  }

  public async getByNumber(number: number): Promise<Account> {
    const accounts = this.getCollection();
    const account = await accounts.findOne<Account>({ number }, { projection: { _id: 0 } });
    if (account != null) {
      return account;
    }
    throw new Error(`Could not find account with number: ${number}`);
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

  public async update({ number, ...rest }: Account): Promise<void> {
    const accounts = this.getCollection();
    await accounts.updateOne({ number }, { $set: { number, ...rest } });
  }

  public async withdraw(number: number, amount: number): Promise<void> {
    const accounts = this.getCollection();
    const account = await accounts.findOne<Account>({ number });
    if (account !== null) {
      const balance = account.balance - amount;
      await accounts.findOneAndUpdate({ number }, { $set: { balance } });
    } else {
      throw new Error(`Could not find account with number: ${number}`);
    }
  }

  /**
   * Get a reference to a MongoDB Collection.
   * @returns a reference to a MongoDB Collection of accounts.
   */
  private getCollection(): Collection<Account> {
    if (this.client !== null) {
      if (typeof COLLECTION === 'undefined') {
        throw new Error('Cound not read configuration data');
      }
      return this.client.db().collection(COLLECTION);
    }
    throw new Error('There is no instance to Mongo client, please connect the repository first.');
  }
}

export default AccountDataSource;
