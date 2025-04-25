import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private _userService = inject(UserService);
  router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor() {
    if (this._userService.isuserLoggedIn()) this.router.navigateByUrl('/');
    console.log(this._userService.currentUser());
  }



  login() {
    this._userService.login(this.loginForm.getRawValue()).subscribe((res) => {
      const { token } = res;
      if (res.token) {
        localStorage.setItem('token', token);
        this.router.navigateByUrl('/');
        this._userService.isuserLoggedIn.set(true);
        // localStorage.setItem('refreshToken', response['refreshToken']);
      }
    });
  }
}
