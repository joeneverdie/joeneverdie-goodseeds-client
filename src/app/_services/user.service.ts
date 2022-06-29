import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthSetting } from './../_provides/auth.provide';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(AuthSetting.USER_API + 'all', {
      responseType: 'text',
    });
  }
  getUserContent(): Observable<any> {
    return this.http.get(AuthSetting.USER_API + 'user', {
      responseType: 'text',
    });
  }
  getAdminContent(): Observable<any> {
    return this.http.get(AuthSetting.USER_API + 'admin', {
      responseType: 'text',
    });
  }
  getModeratorContent(): Observable<any> {
    return this.http.get(AuthSetting.USER_API + 'moderator', {
      responseType: 'text',
    });
  }
}
