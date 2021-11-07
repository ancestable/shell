import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap, shareReplay } from 'rxjs/operators';
import { ConfigurationService } from './configuration.service';
import { LocalStorageKey, LocalStorageService } from './localStorage.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

export interface LoginResponse {
  authToken: string,
  expiresIn: string,
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private configurationService: ConfigurationService,
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) { }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.configurationService.apiUrl}/auth/login`, { email, password })
    .pipe(
      retry(1),
      catchError(this.handleError),
      tap(this.writeSessionToLocalStorage.bind(this)),
      shareReplay(),
    )
  }

  logout(): void {
    this.localStorageService.remove(LocalStorageKey.Token);
    this.localStorageService.remove(LocalStorageKey.ExpiresAt);
    this.router.navigate(['authenticate']);
  }

  isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration(): moment.Moment {
    const expiration = this.localStorageService.read<string>(LocalStorageKey.ExpiresAt);
    if (!expiration) {
      return moment(0);
    }
    return moment(expiration);
  }

  getToken(): string {
    return this.localStorageService.read<string>(LocalStorageKey.Token) || '';
  }

  private writeSessionToLocalStorage(loginResponse: LoginResponse): void {
    const { authToken, expiresIn } = loginResponse;
    const [ expireQuantity, expireDurationUnit ] = expiresIn.split(' ');
    const expiresAt = moment().add(+expireQuantity, expireDurationUnit as any);

    this.localStorageService.write(LocalStorageKey.Token, authToken);
    this.localStorageService.write(LocalStorageKey.ExpiresAt, expiresAt);
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
