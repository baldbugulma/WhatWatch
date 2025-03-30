import {HttpClient, HttpErrorResponse, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {catchError, throwError} from 'rxjs';
import { AuthService } from '../services/auth.service';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (isLoginRequest(req)) {
    // Для запроса логина пропускаем добавление токена
    return next(req);
  }

  // Получаем токен из cookie или сервиса
  const token = authService.token || authService.cookieService.get('token');

  // Клонируем запрос с токеном
  const authReq = token
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    : req;

  return next(authReq).pipe(
    catchError(error => {
      if (error.status === 401) {
        handleUnauthorizedError(authService, router);
      }
      return throwError(() => error);
    })
  );
}

function isLoginRequest(req: HttpRequest<unknown>): boolean {
  return (
    req.url.includes('/api/login') &&
    req.method === 'POST'
  );
}

function handleUnauthorizedError(
  authService: AuthService,
  router: Router
) {
  authService.token = null;
  authService.cookieService.delete('token', '/');
  router.navigate(['/login']);
}
