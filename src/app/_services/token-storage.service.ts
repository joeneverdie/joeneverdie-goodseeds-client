import { Injectable } from '@angular/core';
import { AuthSetting } from '../_provides/auth.provide';
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(AuthSetting.TOKEN_KEY);
    window.sessionStorage.setItem(AuthSetting.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(AuthSetting.TOKEN_KEY);
  }

  public saveUser(user: any) {
    window.sessionStorage.removeItem(AuthSetting.USER_KEY);
    window.sessionStorage.setItem(AuthSetting.USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(AuthSetting.USER_KEY);
    if (user) return JSON.parse(user);
    return {};
  }
}
