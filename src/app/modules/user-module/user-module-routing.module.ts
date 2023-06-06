import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewPasswordComponent } from 'src/app/components/create-new-password/create-new-password.component';
import { ForgotPageComponent } from 'src/app/components/forgot-page/forgot-page.component';
import { LoginPageComponent } from 'src/app/components/login-page/login-page.component';
import { MainPageComponent } from 'src/app/components/main-page/main-page.component';
import { RegistrationPageComponent } from 'src/app/components/registration-page/registration-page.component';

const routes: Routes = [
  {
    path:"login",component:LoginPageComponent
  },
  {
    path:"registration",component:RegistrationPageComponent
  },
  {
    path:"forgot-password",component:ForgotPageComponent
  },
  {
    path:"create-newpassword",component:CreateNewPasswordComponent
  },
  {
    path:"",redirectTo:"login",pathMatch:"full"
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserModuleRoutingModule { }
