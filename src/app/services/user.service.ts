import { HttpClient } from '@angular/common/http';
import { afterNextRender, AfterRenderPhase, inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { devEnvironment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  enviroment = devEnvironment;
  currentUser = signal<User | undefined | null>(undefined);
  isuserLoggedIn = signal<boolean | null>(null);

  private _httpClient = inject(HttpClient);
  constructor() {
    afterNextRender(
      () => {
        this.isuserLoggedIn.set(localStorage.getItem('token') ? true : false);
      },
    );
  }

  login(user: any) {
    return this._httpClient.post<any>(`${this.enviroment.url}/login`, user);
  }
}
