import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './login.model';
import {
  Form,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService],
})
export class LoginComponent {
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

  constructor(private loginService: LoginService) {}

  clearForm(): void {
    this.loginForm.setValue({ email: '', password: '' });
  }

  onSubmit(): void {
    this.clearForm();

    this.loginService
      .attemptLogin(this.loginForm.getRawValue())
      .subscribe(() => {
        this.loginSuccess = true;
      });
  }
}
