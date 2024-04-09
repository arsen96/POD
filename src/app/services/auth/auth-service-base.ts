import { jwtDecode } from "jwt-decode";
import { BaseService } from "../base.service";
import { Observable, catchError, map, shareReplay, tap, throwError } from "rxjs";
import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

export interface BearerToken {
	token: string;
}

export class AuthServiceBase extends BaseService {
  tokenObs:Observable<string>;
  http = inject(HttpClient) 
  router = inject(Router)
  constructor(){
    super();
  }
  getToken(): string | null {
    const token = localStorage.getItem('authToken');
    return token;
  }

  setSession(token:string){
    localStorage.setItem("access_token", token);
  }

  public get isAuthenticated(){
    const token = localStorage.getItem("access_token");
    if(token){
      const decodedToken = jwtDecode(token);
      const now = Date.now() / 1000;
      return typeof decodedToken.exp !== 'undefined' && decodedToken.exp > now;
    }
    return false;
  }

  login(loginCredentials:any,endpoint:string): Observable<string> {
    if(!this.tokenObs){
      this.tokenObs =  this.http.post<BearerToken>(endpoint,loginCredentials)
      .pipe(
        catchError(async err => {
          return err;
        })
      )
      .pipe(
        tap(res => {
          if (res.error) {
            throw throwError(() => "Une erreur lors de l'authentification");
          } else {
            this.setSession(res.token);
          }
        }),
        map(data => {
          return data.token
        }),
        shareReplay()
      );
    }
    return this.tokenObs;
  }


  logout(){
    localStorage.removeItem("access_token");
    this.router.navigateByUrl("login")
  }


}
