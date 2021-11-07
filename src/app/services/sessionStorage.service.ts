import { Injectable } from '@angular/core';
import { BrowserStorageService } from './browserStorage.abstract.service';

@Injectable({
  providedIn: 'root'
})
export abstract class SessionStorageService extends BrowserStorageService {
  constructor() {
    super(sessionStorage);
  }
}
