import * as moment from 'moment';

import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule, TestRequest } from '@angular/common/http/testing';

import { ConfigurationService } from './configuration.service';
import { LoginResponse, LoginService } from './login.service';
import { LocalStorageKey, LocalStorageService } from './localStorage.service';
import { Router } from '@angular/router';

describe('LoginService', () => {
  let service: LoginService;
  let configurationServiceSpy: jasmine.SpyObj<ConfigurationService>;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  const mocks = {
    get apiUrl() {
      return 'api-url';
    },
    get loginResponse(): LoginResponse {
      return {
        token: 'mock-token',
        expiresIn: '10 hours',
      }
    }
  }

  beforeEach(() => {
    configurationServiceSpy = jasmine.createSpyObj('ConfigurationService', [], { 'apiUrl': mocks.apiUrl });
    localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', [ 'read', 'remove', 'write' ])

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: ConfigurationService, useValue: configurationServiceSpy },
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          }
        },
      ]
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  beforeEach(() => {
    localStorageServiceSpy.write.and.callFake(() => {});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#login', () => {
    const email = 'mock-mail';
    const password = 'mock-password';

    function mockSuccessfulLoginCall(): TestRequest {
      const req = httpMock.expectOne(`${mocks.apiUrl}/auth/login`);
      req.flush(mocks.loginResponse);
      return req;
    }

    it('should call endpoint to login and return response', () => {
      service.login(email, password).subscribe((loginResponse) => {
        expect(loginResponse).toEqual(mocks.loginResponse);
      });

      const req = mockSuccessfulLoginCall();
      expect(req.request.method).toEqual('POST');

      httpMock.verify();
    });

    it('should write token to local storage', () => {
      const { token } = mocks.loginResponse;
      service.login(email, password).subscribe(() => {
        expect(localStorageServiceSpy.write).toHaveBeenCalledWith(LocalStorageKey.Token, token);
      });

      mockSuccessfulLoginCall();
    });

    it('should write expiresAt to local storage', () => {
      service.login(email, password).subscribe(() => {
        expect(localStorageServiceSpy.write).toHaveBeenCalled();
      });

      mockSuccessfulLoginCall();
    });
  });

  describe('#logout', () => {
    it('should remove token from local storage', () => {
      service.logout();

      expect(localStorageServiceSpy.remove).toHaveBeenCalledWith(LocalStorageKey.Token);
    });

    it('should remove expiresIn from local storage', () => {
      service.logout();

      expect(localStorageServiceSpy.remove).toHaveBeenCalledWith(LocalStorageKey.ExpiresAt);
    });
  });

  describe('#isLoggedIn', () => {
    it('should be true if current date is before expiresAt date in local storage', () => {
      const expiresAt = moment().add(10, 'hours');
      localStorageServiceSpy.read.and.returnValue(expiresAt);
      const isLoggedIn = service.isLoggedIn();
      expect(isLoggedIn).toBe(true);
    });

    it('should be false if current date is before expiresAt date in local storage', () => {
      const expiresAt = moment().subtract(10, 'hours');
      localStorageServiceSpy.read.and.returnValue(expiresAt);
      const isLoggedIn = service.isLoggedIn();
      expect(isLoggedIn).toBe(false);
    });

    it('should be false if expiresIn date in not found in local storage', () => {
      localStorageServiceSpy.read.and.returnValue(null);
      const isLoggedIn = service.isLoggedIn();
      expect(isLoggedIn).toBe(false);
    });
  });

  describe('#getExpiration', () => {
    it('should return moment instance for expiresAt date from local storage', () => {
      const expiresAt = moment();
      localStorageServiceSpy.read.and.returnValue(expiresAt);
      const expirationDate = service.getExpiration();
      expect(expirationDate).toEqual(expiresAt);
    });

    it('should return moment instance for timestamp 0 if expiresIn date does not exist in local storage', () => {
      const expiresAt = moment(0);
      const expirationDate = service.getExpiration();
      expect(expirationDate).toEqual(expiresAt);
    });
  });

});
