import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TempGuardService implements CanActivate {

  constructor(private _router: Router, private tokenService: TokenService, private auth: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.tokenService.tokenTemp !== null) {
        return true;
      } else {
        this.auth.logoutTemp();
        this._router.navigate(['/login'], { replaceUrl: true });
        return false;
      }
  }

}
