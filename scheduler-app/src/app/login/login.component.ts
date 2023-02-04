import { Component, OnDestroy } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { Login } from './login.model';
import {
  Form,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { LoginService } from '../core/user-services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  loginSuccess = false;
  loginForm = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  private destroy$ = new Subject<void>();

  constructor(private loginService: LoginService) {}

  clearForm(): void {
    this.loginForm.setValue({ email: '', password: '' });
  }

  onSubmit(): void {
    this.loginService
      .login$(this.loginForm.getRawValue())
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loginSuccess = true;
        this.clearForm();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
