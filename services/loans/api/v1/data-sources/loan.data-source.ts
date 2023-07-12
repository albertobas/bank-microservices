import { type Collection, MongoClient } from 'mongodb';
import { WinstonLogger, type IWinstonLogger } from 'logger';
import type LoanRepository from '../core/repositories/loan.repository';
import { type Loan } from 'bank-utils/api/v1/entities';
import { LoansConfigV1 } from '../config';

const DB_URI = LoansConfigV1.DB_URI;
const DB_PORT = LoansConfigV1.DB_PORT;
const DB_USER = LoansConfigV1.DB_USER;
const DB_PASSWORD = LoansConfigV1.DB_PASSWORD;
const COLLECTION = LoansConfigV1.COLLECTION;

class LoanDataSource implements LoanRepository {
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

  public async create({ identifier, ...rest }: Loan): Promise<void> {
    const loans = this.getCollection();
    const loan = await loans.findOne<Loan>({ identifier });
    if (loan !== null) {
      throw new Error(`There is already a loan with the identifier: ${identifier}`);
    }
    await loans.insertOne({ identifier, ...rest });
  }

  public async deleteByIdentifier(identifier: number): Promise<void> {
    const loans = this.getCollection();
    const result = await loans.deleteOne({ identifier });
    if (result.deletedCount !== 1) {
      throw new Error(`Could not find loan with identifier: ${identifier.toString()}`);
    }
  }

  public async getAll(): Promise<Loan[]> {
    const loans = this.getCollection();
    const cursor = loans.find<Loan>({}, { projection: { _id: 0 } });
    if ((await loans.countDocuments()) === 0) {
      this.log('warn', 'No loans found');
    }
    const loansArray = await cursor.toArray();
    return loansArray;
  }

  public async getByIdentifier(identifier: number): Promise<Loan> {
    const loans = this.getCollection();
    const loan = await loans.findOne<Loan>({ identifier }, { projection: { _id: 0 } });
    if (loan != null) {
      return loan;
    }
    throw new Error(`Could not find loan with identifier: ${identifier}`);
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

  public async update({ identifier, ...rest }: Loan): Promise<void> {
    const loans = this.getCollection();
    await loans.updateOne({ identifier }, { $set: { identifier, ...rest } });
  }

  /**
   * Get a reference to a MongoDB Collection.
   * @returns a reference to a MongoDB Collection of loans.
   */
  private getCollection(): Collection<Loan> {
    if (this.client !== null) {
      if (typeof COLLECTION === 'undefined') {
        throw new Error('Cound not read configuration data');
      }
      return this.client.db().collection(COLLECTION);
    }
    throw new Error('There is no instance to Mongo client, please connect the repository first.');
  }
}

export default LoanDataSource;
