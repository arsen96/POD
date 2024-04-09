import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import AOS from 'aos';
import { OauthService, UserInfo } from './services/auth/oauth.service';
import { LoaderComponent } from './components/loader/loader.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
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
