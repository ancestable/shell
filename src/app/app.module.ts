import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FrameComponent } from './components/frame/frame.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { AngularMaterialModule } from './angular-material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatasetSelectorComponent } from './components/dataset-selector/dataset-selector.component';
import { AuthGuard } from './guards/auth.guard';
import { AccountMenuComponent } from './components/account-menu/account-menu.component';
import { CreateNewDatasetDialogComponent } from './components/create-new-dataset-dialog/create-new-dataset-dialog.component';
import { GenericDialogComponent } from './components/generic-dialog/generic-dialog.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FrameComponent,
    LoginRegisterComponent,
    DatasetSelectorComponent,
    AccountMenuComponent,
    CreateNewDatasetDialogComponent,
    GenericDialogComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
