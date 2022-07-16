import { first } from 'rxjs';
import { UserService } from './../../_services/user.service';
import { User } from '../../models/user.class';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentUser?: User;
  returnUrl = '/login';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    this.userService
      .getByUsername(this.tokenStorage.getUsername())
      .pipe(first())
      .subscribe((data) => {
        this.currentUser = data;
      });
  }

  logout() {
    this.authService.logout(this.tokenStorage.getUserId()).subscribe({
      complete: () => {
        this.router.navigate([this.returnUrl]);
      },

      error: (e) => {},
    });
  }
}
