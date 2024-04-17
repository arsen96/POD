import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './token-interceptor.interceptor';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { MessageService } from './services/message.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),provideAnimations(), provideAnimationsAsync(),
    provideOAuthClient(),provideHttpClient(withInterceptors([tokenInterceptor]))
  ],
  
};
