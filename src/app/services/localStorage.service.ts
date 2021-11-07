import { Injectable } from '@angular/core';
import { BrowserStorageService } from './browserStorage.abstract.service';

export enum LocalStorageKey {
  Token = 'Token',
  ExpiresAt = 'ExpiresAt',
}

@Injectable({
  providedIn: 'root'
})
export abstract class LocalStorageService extends BrowserStorageService {
  constructor() {
    super(localStorage);
  }
}
