import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserModuleRoutingModule } from './user-module-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from '../../components/login-page/login-page.component';
import { ForgotPageComponent } from '../../components/forgot-page/forgot-page.component';
import { CreateNewPasswordComponent } from '../../components/create-new-password/create-new-password.component';
import { RegistrationPageComponent } from '../../components/registration-page/registration-page.component';
import {MatIconModule} from '@angular/material/icon';
import { UserModuleComponent } from './user-module.component';
@NgModule({
  declarations: [
    LoginPageComponent,
    ForgotPageComponent,
    CreateNewPasswordComponent,
    RegistrationPageComponent,
    UserModuleComponent

],
  imports: [
    CommonModule,
    UserModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class UserModuleModule { }
