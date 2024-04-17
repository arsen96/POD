import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, map } from "rxjs"


@Injectable({
  providedIn:'root'
})
export class MessageService {
  private messageEmitter = new BehaviorSubject<string[]>([])
  message$ = this.messageEmitter.asObservable().pipe(
    filter((value) => {
      return value && value.length > 0
    })
  )

  showMessage(message:string | string[]){
    let messageSave = Array.isArray(message) ? message : [message]
    this.messageEmitter.next(messageSave);
  }

}
