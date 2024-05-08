import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  postApi = "http://localhost:8000";
  constructor() { }
  protected handleError(error: HttpErrorResponse) {
    let errorMessage:string | Array<string> = 'An unknown error occurred!';

    console.log("errorerrorerror",error)
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
          if(err){
            message.push(err)
          }
        })
        console.log("messagemessage",message)
        errorMessage = message;
      }
    }else if(error){
      errorMessage = "Un problème est survenu"
    }
    console.log("errorMessageerrorMessage",errorMessage)

    return throwError(() => errorMessage);
  }
}
