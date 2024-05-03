import { Component,OnInit,inject, model } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { StandardAuth } from '../../services/auth/standard.service';
import { LoadingService } from '../../services/loading.service';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { CoolSocialLoginButtonsModule  } from '@angular-cool/social-login-buttons';
import { OauthService } from '../../services/auth/oauth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {faLinkedin,faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClient } from '@angular/common/http';
import { Message, MessageService } from '../../services/message.service';
import { MessageComponent } from '../../components/message/message.component';
import { RouterLink } from '@angular/router';
export class FormAuthModel{
  email:string;
  password:string;
  username?:string
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,HeaderComponent,MessageComponent, FooterComponent,FormsModule,CoolSocialLoginButtonsModule,FontAwesomeModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[MessageService]
})

export class LoginComponent  {
  public globalService = inject(GlobalService);
  public standardAuthService = inject(StandardAuth)
  public loaderService = inject(LoadingService);
  public oauthService = inject(OauthService)
  public router = inject(Router)
  public http = inject(HttpClient);
  faLinkedin = faLinkedin;
  faGoogle = faGoogle;

  public smallLoader = true;
  modelLogin: FormAuthModel = {email:"",password:""};
  modelRegister: FormAuthModel = {email:"",password:"",username:""};
  public error = {
    type:'login' || 'register'
  }

  constructor(public route:ActivatedRoute,public messageService:MessageService){
    this.route.fragment.subscribe(async (fragment) => {
      if (fragment) {
        const fragmentParams = new URLSearchParams(fragment);
        const accessToken = fragmentParams.get('id_token') as string;
        const result = this.oauthService.decodeJWT(accessToken);

        if(result.email_verified){
          this.loaderService.setLoading(true);
          try{
            this.loaderService.setLoading(true)
            await this.oauthService.loginOauthApi("oauth_token",[{key:"email",value:result.email}]);
            this.router.navigateByUrl("home").then(() => {
             this.loaderService.setLoading(false)
            })
          }catch(err){
            console.log("error",err)
          }
        }
      }
    })


    this.route.queryParams.subscribe(async (param) => {
      if(param['code']){  
        this.loaderService.setLoading(true)
        let token
        try{
           token = await this.oauthService.loginOauthApi("linkedin_oauth",[{key:"code",value:param["code"]}]);
           this.router.navigateByUrl("home").then(() => {
            this.loaderService.setLoading(false)
           })
        }catch(err:any){
          this.displayError(err)
          this.loaderService.setLoading(false)
        }
          
      }
  })

}



async onSubmitLogin(){
  const login$ = this.standardAuthService.loginStandard(this.modelLogin)
  const result = this.loaderService.showLoaderUntilCompleted(login$);
  result.subscribe({
    next: () => {
      this.router.navigateByUrl('home')
    },error: (err) => {
        this.displayError(err,'login')
    }}
  )
}

displayError(err:string,type?:'login' | 'register'){
  if(type){
    this.error.type = type
  }
  this.messageService.showMessage(err,Message.danger)
}

  onSubmitRegister(){
    const register$ = this.standardAuthService.register(this.modelRegister)
    const result = this.loaderService.showLoaderUntilCompleted(register$);
    result.subscribe({
        next:(res) => {
          console.log("resres",res)
          this.router.navigateByUrl('home')
        },error: (err) => {
          this.displayError(err,'register')
        }
      })
  }

  onGoogleLogin(){
    this.oauthService.loginOauth();
  }

  onLinkedinLogin(){
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${this.oauthService.LINKEDIN_CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Flogin&scope=openid%20email%20profile`
  }

}
