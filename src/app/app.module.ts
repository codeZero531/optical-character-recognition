import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatToolbarModule} from '@angular/material';
import { NavbarComponent } from './coponents/navbar/navbar.component';
import { LoginComponent } from './coponents/login/login.component';
import { RegisterComponent } from './coponents/register/register.component';
import { HomeComponent } from './coponents/home/home.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'ocr-app'),
    AngularFireAuthModule,
    HttpClientModule,

    FlashMessagesModule.forRoot(),
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
