import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { catchError, tap, throwError } from 'rxjs'
import {AuthResponse} from '../interfaces/auth.interface';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  router = inject(Router)
  cookieService = inject(CookieService)

  baseApiUrl = '/api/login'
  token: string | null = null

  login(payload: { email: string, password: string }) {
    return this.http.post<AuthResponse>(this.baseApiUrl, payload, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap((res) => {this.saveTokens(res)})
    );
  }

  saveTokens(res: AuthResponse) {
    this.token = res.authorization.access_token
    const cookieOptions = { path: '/' }
    this.cookieService.set('token', this.token, cookieOptions)
  }
}
