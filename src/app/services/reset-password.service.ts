import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { catchError, pipe, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService extends BaseService {
  http = inject(HttpClient) 
  router = inject(Router)
  constructor() {
    super()
   }

  makeRequest(email:string){
    const formData = new FormData();
    formData.append("email",email)
    return this.http.post<any>(`http://localhost:8000/reset-password/`,formData).pipe(
      catchError(this.handleError),
      (shareReplay())
    )
  }

  resetPassword(token:string,form:{password:string,confirmPassword:string}){
    const formData = new FormData();
    formData.append("password",form.password)
    formData.append("confirmPassword",form.confirmPassword)
    console.log("tokentoken",token)
    return this.http.post<any>(`http://localhost:8000/reset-password/reset/${token}`,formData).pipe(
      pipe(
        catchError(this.handleError)
      ),
      (shareReplay())
    )
  }
}
