import { AuthService } from '../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alterService: AlertService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(6)]],
    });
  }

  get f() { return this.registerForm.controls; };

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) return;

    this.loading = true;
    this.authService.register(this.registerForm.value)
    .pipe(first())
    .subscribe({
      complete: () => {
        this.alterService.success('Registration successful', true);
        this.router.navigate(['/login']);
      },

      error: (error) => {
        console.log(error);

        this.alterService.error(error);
        this.loading = false;
      }
    });
  }
}
