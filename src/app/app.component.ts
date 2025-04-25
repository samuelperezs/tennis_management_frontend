import { Component, effect, inject, OnInit } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HttpClient } from '@angular/common/http';
import { UserService } from './services/user.service';
import { devEnvironment } from '../environments/environment.development';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  enviroment = devEnvironment;
  private _httpClient = inject(HttpClient);
  userService = inject(UserService);
  router = inject(Router);
  previousUrl: string = '';

  constructor() {
    effect(() => this.userService.isuserLoggedIn() != null ? (this.userService.isuserLoggedIn() ? this.checkUser() : this.router.navigateByUrl('/login')) : '');
  }

  ngOnInit(): void {
  }

  checkUser(): void {
    this._httpClient.get<any>(`${this.enviroment.url}/user`).subscribe({
      next: (res) => {
        console.log('response', res);
        this.userService.currentUser.set(res.user);
      },
      error: () => {
        this.userService.currentUser.set(null);
        this.router.navigateByUrl('/login');
      },
    });
  }
}
