import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  constructor(private httpClient: HttpClient) { }

  access(credentials) {
   return this.httpClient.post(`${environment.host}/user/login`, credentials);
  }
}
