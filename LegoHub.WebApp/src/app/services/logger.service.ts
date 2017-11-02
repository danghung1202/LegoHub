import { Injectable } from '@angular/core'

@Injectable()
export class LoggerService {
    log(error) {
        console.error("Logger: ", error);
    }
}