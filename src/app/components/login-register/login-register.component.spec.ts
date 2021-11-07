import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginService } from 'src/app/services/login.service';
import { RegisterService } from 'src/app/services/register.service';

import { LoginRegisterComponent } from './login-register.component';

fdescribe('LoginRegisterComponent', () => {
  let component: LoginRegisterComponent;
  let fixture: ComponentFixture<LoginRegisterComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let registerServiceSpy: jasmine.SpyObj<RegisterService>;

  beforeEach(async () => {
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);
    registerServiceSpy = jasmine.createSpyObj('RegisterService', ['register']);

    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, RouterTestingModule ],
      declarations: [ LoginRegisterComponent ],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: RegisterService, useValue: registerServiceSpy },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {
                returnUrl: 'return-url',
              }
            }
          },
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
