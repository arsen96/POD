import { Component,inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';
import { GoogleApiService } from '../../google-api.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,FormsModule,CoolSocialLoginButtonsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public globalService = inject(GlobalService);
  public authService = inject(AuthService)
  public loaderService = inject(LoadingService);
  public googleService = inject(GoogleApiService)

  public smallLoader = true;

  modelLogin: {email:string;password:string} = {email:"",password:""};
  constructor(){}

  ngOnInit(){

  }

  onSubmit(){
    // this.globalService.setSmallLoading(true);
    // this.loaderService.setLoading(true)
    const $login = this.authService.login(this.modelLogin)
    const loginData = this.loaderService.showLoaderUntilCompleted($login)
    loginData.subscribe({
      next:(res) => {
      console.log("ress",res)
    },error: (error) => {
      console.log("error",error)
    }
  })
  }

  onGoogleLogin(){
    // this.
  }

}
