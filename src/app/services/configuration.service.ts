import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  get apiUrl() {
    return 'http://localhost:3001';
  }
}
