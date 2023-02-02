import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './login.model';
import { Form, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private loginService: LoginService) {}

  clearForm(): void {
    this.loginForm.setValue({ email: '', password: '' });
  }

  onSubmit(): void {
    console.warn(this.loginForm.value);
    // this.loginService.attemptLogin();
  }
}
