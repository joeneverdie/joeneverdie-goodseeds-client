import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthSetting } from './../_provides/auth.provide';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AuthSetting.AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(user: User): Observable<any> {
    return this.http.post(AuthSetting.AUTH_API + 'signup', user, httpOptions);
  }
}
