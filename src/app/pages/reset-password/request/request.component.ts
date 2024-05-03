import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule,} from '@angular/forms';
import { ResetPasswordService } from '../../../services/reset-password.service';
import { LoadingService } from '../../../services/loading.service';
import { Message, MessageService, MessageStatus } from '../../../services/message.service';
import { MessageComponent } from '../../../components/message/message.component';
@Component({
  selector: 'app-request',
  standalone: true,
  imports: [FormsModule,MessageComponent],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css'
})
export class RequestComponent {
  validationErrors:Array<any> = []
  resetPassword =  inject(ResetPasswordService)
  loadingService =  inject(LoadingService)
  router = inject(Router);
  route = inject(ActivatedRoute); 
  messageService = inject(MessageService);
  token:string;

  email:string = ''
  password:string = '';
  confirmPassword:string = '';
  messageEmailSend = false;
  constructor() {}


  ngOnInit(): void {
    this.messageEmailSend = false;
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }
 
  requestAction() {
    const makeRequest = this.resetPassword.makeRequest(this.email)
    const loader = this.loadingService.showLoaderUntilCompleted(makeRequest);
    loader.subscribe(
       {
        next:(answer) => {
          console.log("answer",answer)
          this.messageEmailSend = true;
          this.messageService.showMessage(answer,Message.success)
        },
        error:(error) => {
          this.messageService.showMessage(error,Message.danger)
        }
       }
     )
  }

  resetAction(){
    this.resetPassword.resetPassword(this.token,{password:this.password,confirmPassword:this.confirmPassword}).subscribe(
       {
        next:(answer) => {
          console.log("answeranswer",answer)
          this.router.navigateByUrl("/login");
        },
        error:(error) => {
          console.log("error",error)
          this.messageService.showMessage(error,Message.danger)
        }
       }
     )
  }
}