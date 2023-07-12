import { createLogger, format, transports, type Logger } from 'winston';
const { combine, timestamp, colorize, splat, simple, prettyPrint, printf } = format;

/**
 * Winston logger interface.
 */
export interface IWinstonLogger {
  /**
   * Log an info message.
   * @param message message to log.
   */
  info: (message: string) => void;

  /**
   * Log an error message.
   * @param message message to log.
   */
  error: (message: string) => void;

  /**
   * Log a warning message.
   * @param message message to log.
   */
  warn: (message: string) => void;
}

export class WinstonLogger implements IWinstonLogger {
  private readonly logger: Logger;

  constructor() {
    this.logger = createLogger({
      transports: [new transports.Console({ level: 'debug' })],
      handleExceptions: false,
      format: combine(
        splat(),
        simple(),
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        prettyPrint(),
        printf(({ timestamp, level, message }) => {
          return `[${JSON.stringify(timestamp)}] ${level}: ${JSON.stringify(message)}`;
        })
      )
    });
  }

  info(message: string): void {
    this.logger.info(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }
}
