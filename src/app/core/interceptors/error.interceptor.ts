import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../authentication/auth.service';
// import { HelperService } from '../services/helper.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            // this.helper.alert((err.error) ? err.error.message : "request error", true)
            if (err.status === 401) { this.auth.logout(); }

            const error = (err.error) ? err.error.message || err.statusText : '';
            return throwError(error);
        }));
    }
}
