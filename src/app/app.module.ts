import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/authentication.interceptor';

import { AppComponent } from './app.component';
import {MetaModule} from './meta/meta.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { MemeComponent } from './Meme/meme/meme.component';
import { LoginComponent } from './components/user/login/login.component';
import { SharedModulesModule } from './shared/shared-modules.module';
import { AppRoutingModule } from './app-routing.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { SignupComponent } from './components/user/signup/signup.component';
import { LandingComponent } from './components/landing/landing.component';
import { ForgetPasswordComponent } from './components/user/forget-password/forget-password.component';
import { VerifyComponent } from './components/user/verify/verify.component';
import { HomeComponent } from './components/main/home/home.component';
import { ComposeMessageComponent } from './components/main/compose-message/compose-message.component';
import { HeaderComponent } from './components/header/header.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ViewMessageComponent } from './components/main/view-message/view-message.component';
const config: SocketIoConfig = { url: 'http://localhost:5100', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    MemeComponent,
    LoginComponent,
    SignupComponent,
    LandingComponent,
    VerifyComponent,
    HomeComponent,
    ViewMessageComponent,
    ForgetPasswordComponent,
    ComposeMessageComponent,
    HeaderComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MetaModule,
    SharedModulesModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  entryComponents: [ComposeMessageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
