import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from "jwt-decode";
import { AuthService } from '../services/auth.service';


export const accesoGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  let token = inject(CookieService).get('invToken')
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  const tokenData: any = jwt_decode(token)
  const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
  if (tokenData.exp && tokenData.exp > currentTime) {
    return true
  } else {
    authService.renovarToken()
    .then((result) => {
      if(!result){
        router.navigate(['../login'])
      }
    })
    return false
    
    
  }
};




