import { HttpInterceptorFn } from '@angular/common/http';
import { UserService } from './user.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const token = localStorage.getItem('token') ?? '';
  if (!token) userService.isuserLoggedIn.set(false);
  if (req.url.includes('/login')) return next(req);

  req = token
    ? req.clone({
        setHeaders: { Authorization: token },
      })
    : req;

  return next(req);
};
