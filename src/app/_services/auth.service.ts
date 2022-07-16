import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { User } from '../models/user.class';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthConst } from '../_const/auth.const';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(
        AuthConst.AUTH_API + 'signin',
        {
          username,
          password,
        },
        httpOptions
      )
      .pipe(
        map((user) => {
          return user;
        })
      );
  }

  register(user: User): Observable<any> {
    return this.http.post(AuthConst.AUTH_API + 'signup', user, httpOptions);
  }

  refreshToken(token: String) {
    return this.http.post(
      AuthConst.AUTH_API + 'refreshtoken',
      { refreshtoken: token },
      httpOptions
    );
  }

  logout(userId: number): Observable<any> {
    this.tokenStorage.signOut();
    return this.http.post(
      AuthConst.AUTH_API + 'logout',
      { userId },
      httpOptions
    );
  }
}
