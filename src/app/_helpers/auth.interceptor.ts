import { TokenStorageService } from './../_services/token-storage.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthSetting } from './../_provides/auth.provide';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();

    if (token != null) {
      authReq = req.clone({
        headers: req.headers.set(
          AuthSetting.TOKEN_HEADER_KEY,
          AuthSetting.BEARER + token
        ),
      });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: AuthSetting.HTTP, useClass: AuthInterceptor, multi: true}
];
