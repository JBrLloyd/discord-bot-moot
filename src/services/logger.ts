import { injectable } from "inversify";
import { createLogger, format, transports } from "winston";
import { ILogger } from "./interfaces";

const appName = "Discord_Bot_Moot";

@injectable()
export class Logger implements ILogger {
  private _logger;

  constructor() {
    this._logger = this.SetupLogger();
  }

  public debug(msg: string) {
    this._logger.debug(msg);
  }

  public info(msg: string) {
    this._logger.info(msg);
  }

  public warn(msg: string) {
    this._logger.warn(msg);
  }

  public error(msg: string) {
    this._logger.error(msg);
  }

  private SetupLogger() {
    const logger = createLogger({
      level: process.env.LOG_LEVEL ?? "INFO",
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
      ),
      transports: [
        new transports.File({ filename: `${appName}-error.log`, level: "error" }),
        new transports.File({ filename: `${appName}.log` }),
      ],
    });
    
    if (process.env.NODE_ENV !== "production") {
      logger.add(
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        })
      );
    }

    return logger;
  }
}