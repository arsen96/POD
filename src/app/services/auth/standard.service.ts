import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthServiceBase } from './auth-service-base';

@Injectable({
  providedIn: 'root',
})
export class StandardAuth extends AuthServiceBase {
  constructor() {
    super();
   }

  override login(loginCredentials:{email:string;password:string}): Observable<string>{
    const token = super.login(loginCredentials,`${this.postApi}/api/login-token`);
    return token;
  }


}
