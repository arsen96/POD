import { jwtDecode } from "jwt-decode";
import { BaseService } from "../base.service";
import { Observable, catchError, map, shareReplay, tap, throwError } from "rxjs";
import { inject } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormAuthModel } from "../../pages/login/login.component";

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
        catchError(this.handleError)
      )
      .pipe(
        tap(res => {
          if (res) {
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


  protected handleError(error: HttpErrorResponse) {
    let errorMessage:string | Array<string> = 'An unknown error occurred!';

    console.log("errorerror",error)
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else if(error.error?.error && error.status === 400){
      if(!Array.isArray(error.error?.message)){
        errorMessage = error.error.message
      }else{
        let message = new Array();
        errorMessage = new Array();
        error.error?.message.forEach((err:any) => {
          if(err.message){
            message.push(err.message)
          }
        })
        errorMessage = message;
      }
    }else if(error){
      errorMessage = "Un problème est survenu"
    }

    return throwError(() => errorMessage);
  }

  decodeJWT(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }



  logout(){
    localStorage.removeItem("access_token");
    this.router.navigateByUrl("login")
  }


}
