import { json, urlencoded } from 'body-parser';
import express, { Router, type Express, type Request, type Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import apicache from 'apicache';
import { StatusCodes } from 'http-status-codes';
import { type IWinstonLogger } from 'logger';

export interface RouteData {
  method: 'all' | 'post' | 'put' | 'patch' | 'get' | 'delete';
  path: string;
  handler: (request: Request, response: Response) => void | Promise<void>;
  isSync?: boolean;
}

export interface Config {
  cache?: {
    duration: string;
    onlySuccesses: boolean;
  };
  cors?: cors.CorsOptions;
}

export class ExpressApi {
  private readonly server: Express;
  private readonly logger: IWinstonLogger;

  /**
   * ExpressApi Constructor.
   * @param logger an instance of a logger of type IWinstonLogger.
   * @param routesData array of objects of type RouteData with the method, path and handler for every route.
   * @param cacheConfig object of type CacheConfig that gathers the caching duration time in the
   *     format "[length] [unit]", as in "10 minutes" or  "1 day" of minutes to cache data for
   *     and whether to only chache for responses that succed or not. Caching will be disabled
   *     if undefined.
   */
  constructor(logger: IWinstonLogger, routesData: RouteData[], config?: Config) {
    this.server = express();
    this.logger = logger;
    this.setUpConfig(config);
    this.setUpRoutes(routesData);
  }

  /**
   * Start the Express server.
   * @param port port where the api is served.
   */
  start(path: string): void {
    this.server.listen(path, () => {
      this.logger.info(`Server started at http://localhost:${path}`);
    });
  }

  /**
   * Set up server configuration middlewares.
   * @param config object of type Config that gathers the required server configuration.
   */
  private setUpConfig(config?: Config): void {
    this.server
      .disable('x-powered-by')
      .use(morgan('dev'))
      .use(urlencoded({ extended: true }))
      .use(json())
      .use(cors(config?.cors))
      .use(function (req, res, next) {
        req.setTimeout(4000);
        next();
      });

    // If caching
    if (config?.cache !== undefined) {
      const cache = apicache.middleware;
      const { duration, onlySuccesses } = config.cache;
      // If caching only succesfull responses
      if (onlySuccesses) {
        const onlyStatus200 = (request: Request, { statusCode }: Response): boolean => statusCode === StatusCodes.OK;
        this.server.use(cache(duration, onlyStatus200));
      }
      // If caching all responses
      else {
        this.server.use(cache(`${cache.toString()} minutes`));
      }
    }
  }

  /**
   * https://expressjs.com/en/advanced/best-practice-performance.html#use-promises
   * @param fn handler to wrap.
   * @param isSync boolean that represents whether the handler is synchronous.
   */
  private wrap(fn: any, isSync?: boolean): (...args: any[]) => void {
    if (isSync !== undefined && isSync) {
      return fn;
    }
    return (...args: any[]) => {
      fn(...args).catch(args[2]);
    };
  }

  /**
   * Set up server routes.
   * @param routesData array of objects of type RouteData with the method, path and handler for every route.
   */
  private setUpRoutes(routesData: RouteData[]): void {
    const router = Router();
    routesData.forEach(({ method, path, handler, isSync }) => router.route(path)[method](this.wrap(handler, isSync)));
    this.server.use(router);
  }
}
