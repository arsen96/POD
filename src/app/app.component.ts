import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import AOS from 'aos';
import { OauthService, UserInfo } from './services/auth/oauth.service';
import { LoaderComponent } from './components/loader/loader.component';
import { MessageService } from './services/message.service';
import { MessageComponent } from './components/message/message.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoaderComponent,MessageComponent,HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[MessageService]
})
export class AppComponent {
  title = 'e-commerceAngular';
  userInfo:UserInfo
  
  constructor(private readonly googleApi:OauthService){
    googleApi.userProfileSubject.subscribe((info:any) => {
      this.userInfo = info;
    })
  }
  ngOnInit(){
    AOS.init({disable: 'mobile'});
    AOS.refresh();
  }
}
