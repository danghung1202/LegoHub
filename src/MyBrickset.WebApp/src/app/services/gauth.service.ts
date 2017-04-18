import { Subscription } from 'rxjs/Rx';
import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

import { Store } from '@ngrx/store';
import { CLIENT_ID } from './constants';
import { GapiLoader } from './gapi-loader.service';
import { AppService } from './app.service';

@Injectable()
export class GAuth2 {
  private _googleAuth: gapi.auth2.GoogleAuth;
  private _scope = 'profile email https://www.googleapis.com/auth/youtube';
  private _accessToken: string;
  private _isAdminstrator: boolean;
  private autoSignInTimer: Subscription;

  set accessToken(value) {
    this._accessToken = value;
  }
  get accessToken() {
    return this._accessToken;
  }

  constructor(
    private zone: NgZone,
    private gapiLoader: GapiLoader,
    private appService: AppService,
    public http: Http
  ) {
    this.loadAuth();
  }

  loadAuth() {
    // attempt to SILENT authorize
    this.gapiLoader
      .load('auth2')
      .switchMap(() => this.authorize())
      .do((googleAuth: gapi.auth2.GoogleAuth) => {
        this.saveGoogleAuth(googleAuth);
        this.listenToGoogleSignInStageChange(googleAuth);
        this.listenToGoogleCurrentUserChange(googleAuth);
      })
      .filter((googleAuth: gapi.auth2.GoogleAuth) => this.hasAccessToken(googleAuth))
      .map((googleAuth: gapi.auth2.GoogleAuth) => googleAuth.currentUser.get())
      .subscribe((googleUser: gapi.auth2.GoogleUser) => {
        this.zone.run(() => this.handleSuccessLogin(googleUser));
      });
  }

  authorize() {
    const authOptions = {
      client_id: `${CLIENT_ID}.apps.googleusercontent.com`,
      scope: this._scope
    };
    return Observable.fromPromise(window['gapi'].auth2.init(authOptions));
  }

  private hasAccessToken(googleAuth: gapi.auth2.GoogleAuth): boolean {
    return googleAuth && googleAuth.isSignedIn.get() && googleAuth.currentUser.get().getAuthResponse().hasOwnProperty('access_token');
  }

  private saveGoogleAuth(googleAuth: gapi.auth2.GoogleAuth): any {
    this._googleAuth = googleAuth;
  }

  private listenToGoogleSignInStageChange(googleAuth: gapi.auth2.GoogleAuth) {
    //window['gapi']['auth2'].getAuthInstance().isSignedIn.listen(authState => {
    googleAuth.isSignedIn.listen(isUserSignIn => {
      console.log('authState changed', isUserSignIn);
      if (isUserSignIn) {

      } else {
        //Todo: Implement auto sign out user
      }
    });
  }

  private listenToGoogleCurrentUserChange(googleAuth: gapi.auth2.GoogleAuth) {
    googleAuth.currentUser.listen((googleUser: gapi.auth2.GoogleUser) => {
      console.log('Google user changed', googleUser);
      //Todo: Update with new user
    });
  }

  isSignIn() {
    return this._googleAuth && this._googleAuth.isSignedIn.get();
  }

  isAdminstrator() {
    return this._googleAuth && this._googleAuth.isSignedIn.get() && this._isAdminstrator;
  }

  signIn() {
    const signOptions: gapi.auth2.SigninOptions = { scope: this._scope };
    if (this._googleAuth) {
      Observable.fromPromise(this._googleAuth.signIn(signOptions))
        .subscribe((response: any) => this.handleSuccessLogin(response), error => this.handleFailedLogin(error));
    }
  }

  handleSuccessLogin(googleUser: gapi.auth2.GoogleUser) {
    const authResponse = googleUser.getAuthResponse();
    const token = authResponse.access_token;
    const profile = googleUser.getBasicProfile();
    const MILLISECOND = 1000;
    const expireTimeInMs = parseInt(authResponse.expires_in, 10) * MILLISECOND;

    console.log('User sign in', googleUser);

    this.appService.login(authResponse.id_token, authResponse.access_token)
      .do(response => console.log(response))
      .subscribe(response => {
        this._isAdminstrator = response.isAdministrator ? true : false;
      });

    // if (this.autoSignInTimer) {
    //   this.autoSignInTimer.unsubscribe();
    // }
    // this.autoSignInTimer = this.startTimerToNextAuth(expireTimeInMs);
  }

  startTimerToNextAuth(timeInMs: number): Subscription {
    return Observable.timer(timeInMs)
      .timeInterval()
      .switchMap(() => this.authorize())
      .do((googleAuth: gapi.auth2.GoogleAuth) => this.saveGoogleAuth(googleAuth))
      .map((googleAuth: gapi.auth2.GoogleAuth) => googleAuth.currentUser.get())
      .subscribe((googleUser: gapi.auth2.GoogleUser) => {
        this.zone.run(() => this.handleSuccessLogin(googleUser));
      });
  }

  handleFailedLogin(response) {
    console.log('FAILED TO LOGIN:', response);
  }

  signOut() {
    return Observable.fromPromise(this._googleAuth.signOut())
      .subscribe(response => {
        console.log('Logout:', response);
        this.appService.logout()
          .do(response => console.log(response))
          .subscribe(response => {
            this._isAdminstrator = false;
          });

      });
  }
}
