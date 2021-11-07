import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoginService } from 'src/app/services/login.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  private emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  loginForm: FormGroup;
  registerForm: FormGroup;

  loginError: string;
  registerError: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private registerService: RegisterService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required],
    });

    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required],
      rePassword: [null, Validators.required],
    });

    this.loginForm.valueChanges.subscribe(() => this.loginError = '');
  }

  register() {
    if (!this.registerForm.valid) {
      return;
    }

    const { email, password } = this.registerForm.value;
    this.registerService.register(email, password)
      .pipe(
        catchError((err) => {
          this.registerError = err;
          return throwError('error')
        })
      )
      .subscribe((response) => console.log(response));
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.loginService.login(email, password)
      .pipe(
        catchError((err) => {
          this.loginError = err;
          return throwError('error')
        })
      )
      .subscribe(() => this.router.navigate([this.activatedRoute.snapshot.queryParams?.returnUrl || '']));
  }
}
