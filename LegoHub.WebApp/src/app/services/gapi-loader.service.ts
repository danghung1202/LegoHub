import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { CLIENT_ID } from './constants';


@Injectable()
export class GapiLoader {
  constructor() { }

  load (api: string) {
    return this.createApi(api);
  }

 private loadApi (api: string, observer) {
    const gapi = window['gapi'];
    const gapiAuthLoaded = gapi && gapi.auth2 && gapi.auth2.getAuthInstance();
    if (gapiAuthLoaded && gapiAuthLoaded.currentUser) {
      return observer.next(gapiAuthLoaded);
    }
    gapi.load(api, response => observer.next(response));
  }

  createApi (api: string) {
    const api$ = new Subject();
    const gapi = window['gapi'];
    const isGapiLoaded = gapi && gapi.load;
    const onApiLoaded = () => this.loadApi(api, api$);
    if (isGapiLoaded) {
      onApiLoaded();
    } else {
      window['gapiLoaded'] = onApiLoaded;
    }

    return api$;
  }
}
