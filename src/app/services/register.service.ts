import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, shareReplay } from 'rxjs/operators';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private configurationService: ConfigurationService,
    private http: HttpClient,
  ) { }

  register(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.configurationService.apiUrl}/auth/register`, { email, password })
    .pipe(
      retry(1),
      catchError(this.handleError),
      shareReplay(),
    )
  }

  // Error handling
  private handleError(error: any) {
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
