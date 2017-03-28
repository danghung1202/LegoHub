import { Injectable } from '@angular/core'

@Injectable()
export class LoggerService {
    log(error) {
        console.log("Logger: ", error);
    }
}