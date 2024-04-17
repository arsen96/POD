import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import {Subject,lastValueFrom,} from 'rxjs';
import { AuthServiceBase } from './auth-service-base';
import { environment } from '../../../environments/environment';


export interface UserInfo {
  info:{
    sub:string;
    email:string;
    name:string;
    picture:string;
    email_verified:boolean
  }
}


const googleAuthConfig:AuthConfig = {
   issuer: 'https://accounts.google.com',
   redirectUri: window.location.origin + '/login',
   strictDiscoveryDocumentValidation:false,
   clientId: '',
   dummyClientSecret: 'secret',
   scope: 'openid profile email ',
   showDebugInformation: true,
}

@Injectable({
  providedIn: 'root'
})
export class OauthService extends AuthServiceBase{

  userProfileSubject = new Subject<UserInfo>();
  LINKEDIN_CLIENT_ID:string;
  public environment:any
  constructor(public oAuthService:OAuthService) {
    super();
    this.environment = environment;
    this.LINKEDIN_CLIENT_ID = this.environment.LINKEDIN_CLIENT_ID
    googleAuthConfig.clientId = this.environment.GOOGLE_CLIENT_ID
    oAuthService.configure(googleAuthConfig);
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


  async loginOauthApi(endpoint:string,data:Array<{key:string,value:string}>): Promise<string | null>{
    const formData = new FormData();
    data.forEach((formDataElement) => {
      formData.append(formDataElement.key,formDataElement.value)
    })
    return await lastValueFrom(super.login(formData,`${this.postApi}/${endpoint}`));
}
  
   override logout(){
    this.oAuthService.logOut();
    super.logout();
   }


}


