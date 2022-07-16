import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserConst } from '../_const/user.const';
import { AuthConst } from '../_const/auth.const';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getById(id: number): Observable<any> {
    return this.http.get(AuthConst.AUTH_API + id, {
      responseType: 'json'
    })
  }

  getByUsername(username: any): Observable<any> {
    return this.http.get(UserConst.USER_API + 'loadByUsername/' + username, {
     responseType: 'json',
    })
  }
}
