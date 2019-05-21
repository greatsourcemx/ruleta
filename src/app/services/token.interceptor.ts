import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if ( this.auth.usuario ) {
      if ( this.auth.usuario.Token ) {
        request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${this.auth.usuario.Token}`
          }
        });
      }
    }

    return next.handle(request);
  }
}
