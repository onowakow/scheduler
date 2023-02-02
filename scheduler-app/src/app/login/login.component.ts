import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './login.model';
import { Form, FormBuilder } from '@angular/forms';
/* Does a service/injectable need to be imported elsewhere? app mod? */
// import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.fromBuilder.group({
    email: '',
    password: '',
  });

  constructor(
    private fromBuilder: FormBuilder
  ) // private loginService: LoginService
  {}

  onSubmit(): void {
    console.log('Submit');
  }
}
