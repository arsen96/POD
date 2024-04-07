import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, throwError } from 'rxjs';
import {catchError, map, shareReplay, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
export interface BearerToken {
	token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  tokenObs: Observable<string>;
  constructor(public http:HttpClient) {
    super();
   }

   public test(){
    this.http.get<BearerToken>(`${this.postApi}/api/create`).subscribe((next) => {
      console.log("nexxt",next)
    },data => {
      console.log("error",data)
    })
   }

  public login(loginCredentials:{email:string;password:string}): Observable<string>{
    if(!this.tokenObs){
      this.tokenObs =  this.http.post<BearerToken>(`${this.postApi}/api/login-token`,loginCredentials)
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
    return this.tokenObs
  }

  setSession(token:string){
    localStorage.setItem("access_token", token);
  }

  public get isAuthenticated(){
    const token = localStorage.getItem("access_token");
    if(token){
      const decodedToken = jwtDecode(token);
      const now = Date.now() / 1000;
      // Vérifie si le token n'est pas expiré
      return typeof decodedToken.exp !== 'undefined' && decodedToken.exp > now;
    }

    return false;
  }

  logout(){
    localStorage.removeItem("access_token");
  }
   

}
