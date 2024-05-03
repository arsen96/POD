import { Injectable } from '@angular/core';
import { Observable, catchError, lastValueFrom, map, shareReplay, tap, throwError } from 'rxjs';
import { AuthServiceBase } from './auth-service-base';
import { FormAuthModel } from '../../pages/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class StandardAuth extends AuthServiceBase {
  constructor() {
    super();
   }

   loginStandard(loginCredentials:FormAuthModel): any{
      const value = super.login(loginCredentials,`${this.postApi}/api/login-token`);
      return value.pipe(
        catchError((error) => {
          // Gestion de l'erreur, vous pouvez renvoyer un Observable d'erreur si nécessaire
          console.error('Erreur lors de la connexion:', error);
          return throwError(() => 'Identifiants incorrect')
        })
      ).pipe(
        map((data:string) => {
          console.log("datadata",data)
          return data;
        })
      )
    }

    register(form:FormAuthModel){
      const formData = new FormData();
      if(form.username){
        formData.append("username",form.username);
      }
      formData.append("email",form.email);
      formData.append("plainPassword",form.password);
        return this.http.post<any>(`${this.postApi}/register`,formData).pipe(
          catchError(this.handleError)
        ).pipe(
          tap(res => {
            if (res) {
              this.setSession(res.token);
            } 
          }),
          map(data => {
            return data.token
          })
        );
   
  }
}
