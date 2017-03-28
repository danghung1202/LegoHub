import { ErrorHandler, Injectable } from '@angular/core';
import { LoggerService } from './logger.service';


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private logger: LoggerService) {
        // We rethrow exceptions, so operations like 'bootstrap' will result in an error
        // when an error happens. If we do not rethrow, bootstrap will always succeed.
    }

    handleError(error) {
        this.logger.log(error);
    }
}