import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public get token(): string {
    return localStorage.getItem("userPermission");
  }

  public get tokenTemp(): string {
    return localStorage.getItem("tempPermission");
  }

  public set token(token: string) {
    localStorage.setItem("userPermission", token);
  }

  public set tokenTemp(token: string) {
    localStorage.setItem("tempPermission", token);
  }

  public logout() {
    localStorage.removeItem("userPermission");
  }

  public logoutTemp() {
    localStorage.removeItem("tempPermission");
  }
}
