import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { ActivatedRoute, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData = {};

  constructor(private tokenService: TokenService, private route: ActivatedRoute, private router: Router) { }

  public logout() {
    this.tokenService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  public logoutTemp() {
    this.tokenService.logoutTemp();
  }

  public async logIn(data) {
    this.tokenService.token = data['token'];
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  public logInTemp(data) {
    this.tokenService.tokenTemp = data['token'];
  }
}
