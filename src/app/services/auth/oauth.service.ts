import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Observable, Subject, catchError, map, shareReplay, tap, throwError } from 'rxjs';
import { AuthServiceBase } from './auth-service-base';
import { HttpClient } from '@angular/common/http';


export interface UserInfo {
  info:{
    sub:string;
    email:string;
    name:string;
    picture:string;
    email_verified:boolean
  }
}


const oAuthConfig:AuthConfig = {
   // Url of the Identity Provider
   issuer: 'https://accounts.google.com',

   // URL of the SPA to redirect the user to after login
   redirectUri: window.location.origin + '/login',

   strictDiscoveryDocumentValidation:false,

   // The SPA's id. The SPA is registerd with this id at the auth-server
   // clientId: 'server.code',
   clientId: '773882615556-1eejcai1psd4eudoesf7fqq3i2gntvo5.apps.googleusercontent.com',

   // Just needed if your auth server demands a secret. In general, this
   // is a sign that the auth server is not configured with SPAs in mind
   // and it might not enforce further best practices vital for security
   // such applications.
   dummyClientSecret: 'secret',

   //responseType: 'code',

   // set the scope for the permissions the client should request
   // The first four are defined by OIDC.
   // Important: Request offline_access to get a refresh token
   // The api scope is a usecase specific one
   scope: 'openid profile email ',

   showDebugInformation: true,
}

@Injectable({
  providedIn: 'root'
})
export class OauthService extends AuthServiceBase{

  userProfileSubject = new Subject<UserInfo>();

  constructor(public oAuthService:OAuthService) {
    super();
    oAuthService.configure(oAuthConfig);
   }

   public loginOauth(){
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      this.oAuthService.tryLoginImplicitFlow().then(() => {
        if(!this.oAuthService.hasValidAccessToken()){
          this.oAuthService.initLoginFlow();
        }else{
          this.oAuthService.loadUserProfile().then((userProfile) => {
              this.userProfileSubject.next(userProfile as UserInfo);
          })
        }
      })
    })
   }

   decodeJWT(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  override login(email:string): Observable<string>{
    const formData = new FormData();
    formData.append("email",email)
    const token = super.login(formData,`${this.postApi}/google_oauth`);
    return token;
  }
  

   isLoggedIn():boolean{
    return this.oAuthService.hasValidAccessToken();
   }

   override logout(){
    this.oAuthService.logOut();
    super.logout();
   }


}


