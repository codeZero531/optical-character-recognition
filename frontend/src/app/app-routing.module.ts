import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './coponents/login/login.component';
import {RegisterComponent} from './coponents/register/register.component';
import {HomeComponent} from './coponents/home/home.component';
import {AuthGuard} from './guards/auth.guard';
import {PaswordResetComponent} from './coponents/pasword-reset/pasword-reset.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home' , component: HomeComponent},
  {path: 'password-reset', component: PaswordResetComponent},
  {path: '', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
