import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
export interface Email {

}


@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  createEmail(email: Email) {
    return this.http.post(`${environment.host}/user/createMail`, email).pipe(
      map((res) => {
        return res;
      }))
  }
}
