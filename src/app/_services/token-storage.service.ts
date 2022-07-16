import { Injectable } from '@angular/core';
import { AuthConst } from '../_const/auth.const';
import { UserConst } from '../_const/user.const';
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    sessionStorage.clear();
  }

  public saveToken(token: string): void {
   sessionStorage.removeItem(AuthConst.TOKEN_KEY);
   sessionStorage.setItem(AuthConst.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(AuthConst.TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    sessionStorage.removeItem(AuthConst.REFRESH_TOKEN_KEY);
    sessionStorage.setItem(AuthConst.REFRESH_TOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return sessionStorage.getItem(AuthConst.REFRESH_TOKEN_KEY);
  }

  public saveUser(user: any, id: any) {
    sessionStorage.removeItem(UserConst.USER_KEY);
    sessionStorage.removeItem(UserConst.USER_ID);
    sessionStorage.setItem(UserConst.USER_KEY, JSON.stringify(user));
    sessionStorage.setItem(UserConst.USER_ID, id);
  }

  public getUsername(): any {
    const user = sessionStorage.getItem(UserConst.USER_KEY);
    if (user) return JSON.parse(user);
    return {};
  }

  public getUserId(): any {
    return sessionStorage.getItem(UserConst.USER_ID);
  }
}
