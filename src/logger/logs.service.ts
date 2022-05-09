import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LogsService {
  log(message: any, ...optionalParams: any[]) {
    Logger.log(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    Logger.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    Logger.warn(message, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    Logger.debug(message, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    Logger.verbose(message, ...optionalParams);
  }
}
