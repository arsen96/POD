import { Component,inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { StandardAuth } from '../../services/auth/standard.service';
import { LoadingService } from '../../services/loading.service';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';
import { OauthService } from '../../services/auth/oauth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,FormsModule,CoolSocialLoginButtonsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public globalService = inject(GlobalService);
  public authService = inject(StandardAuth)
  public loaderService = inject(LoadingService);
  public googleService = inject(OauthService)
  public router = inject(Router)

  public smallLoader = true;

  modelLogin: {email:string;password:string} = {email:"",password:""};
  constructor(public route:ActivatedRoute){
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        const fragmentParams = new URLSearchParams(fragment);
        const accessToken = fragmentParams.get('id_token') as string;
        const result = this.googleService.decodeJWT(accessToken);

        if(result.email_verified){
          const loginGoogle$ = this.googleService.login(result.email);
          const loginGoogle = this.loaderService.showLoaderUntilCompleted(loginGoogle$)
          loginGoogle.subscribe((token) => {
            this.router.navigateByUrl("home")
          })
        }
      }
    })
  }



  ngOnInit(){
     
  }

   

  onSubmit(){
    const $login = this.authService.login(this.modelLogin)
    const loginData = this.loaderService.showLoaderUntilCompleted($login)
    loginData.subscribe({
      next:() => {
      this.router.navigateByUrl('home')
    },error: (error) => {
      console.log("error",error)
    }
  })
  }

  onGoogleLogin(){
    this.googleService.loginOauth();
    // this.loaderService.setLoading(true);
  //   this.googleService.userProfileSubject.subscribe(
  //    {
  //     next:(data) => {
  //     if(data.info.email_verified){
  //       this.authService.loginGoogle(data.info.email).subscribe({
  //        next: (token) => {
  //         console.log("tokentoken",token)
  //       },complete: () => {
  //         // this.loaderService.setLoading(false)
  //       }
  //     })
  //     }
  //   },error: (error) => {
  //     console.log("errorerror",error)
  //     this.loaderService.setLoading(false)
  //   }
  // }
  // )
  }

}
