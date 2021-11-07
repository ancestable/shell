import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule, TestRequest } from '@angular/common/http/testing';

import { ConfigurationService } from './configuration.service';
import { RegisterService } from './register.service';


describe('LoginService', () => {
  let service: RegisterService;
  let configurationServiceSpy: jasmine.SpyObj<ConfigurationService>;

  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  const mocks = {
    get apiUrl() {
      return 'api-url';
    },
    get registerResponse() {
      return {};
    }
  }

  beforeEach(() => {
    configurationServiceSpy = jasmine.createSpyObj('ConfigurationService', [], { 'apiUrl': mocks.apiUrl });

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: ConfigurationService, useValue: configurationServiceSpy },
      ]
    });
    service = TestBed.inject(RegisterService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#register', () => {
    const email = 'mock-mail';
    const password = 'mock-password';

    function mockSuccessfulRegisterCall(): TestRequest {
      const req = httpMock.expectOne(`${mocks.apiUrl}/auth/register`);
      req.flush(mocks.registerResponse);
      return req;
    }

    it('should call endpoint to login and return response', () => {
      service.register(email, password).subscribe((registerResponse) => {
        expect(registerResponse).toEqual(mocks.registerResponse);
      });

      const req = mockSuccessfulRegisterCall();
      expect(req.request.method).toEqual('POST');

      httpMock.verify();
    });
  });

});
