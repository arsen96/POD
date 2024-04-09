import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { StandardAuth } from '../services/auth/standard.service';




@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  constructor(public router:Router,public authService:StandardAuth){
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      // Vérifie si le token n'est pas expiré
      if (this.authService.isAuthenticated) {
          // Token expiré
          localStorage.removeItem('access_token');
          // this.router.navigate(['/home'], { queryParams: { returnUrl: state.url }});
          return false;
      }
      // Token valide
      return true;
  }
}


@Injectable({
  providedIn: 'root',
})
class isAuth {
  constructor(public router:Router,public authService:StandardAuth){
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // Vérifie si le token n'est pas expiré
        if (this.authService.isAuthenticated) {
            // Token expiré
            this.router.navigate(['/home']);
            return false;
        }
    // Pas de token trouvé, redirection vers la page de connexion
    return true;
  }
}

export const accessControlsGuard: CanActivateFn = (route, state) => {
  return inject(isAuth).canActivate(route,state);
};
