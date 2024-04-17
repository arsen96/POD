import { Component } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  displayMessage = false;
  message:Observable<string[]>;
  constructor(public messageService:MessageService){
    this.messageService.message$.subscribe(() => {
      this.displayMessage = true;
    })
  }

  close(){
    this.displayMessage = false;
  }
  

}
