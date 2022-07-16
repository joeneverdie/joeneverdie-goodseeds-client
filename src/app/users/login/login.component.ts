import { TokenStorageService } from './../../_services/token-storage.service';
import { AlertService } from './../../_services/alert.service';
import { AuthService } from './../../_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alterService: AlertService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.authService.logout(this.tokenStorage.getUserId());

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService
      .login(this.f['username'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: (data) => {
           this.tokenStorage.saveToken(data['accessToken']);
           this.tokenStorage.saveRefreshToken(data['refreshToken']);
           this.tokenStorage.saveUser(data['username'], data['id']);
        },

        complete: () => {
          this.router.navigate([this.returnUrl]);
        },

        error: (e) => {
          this.alterService.error(e);
          this.loading = false;
        },
      });
  }
}
