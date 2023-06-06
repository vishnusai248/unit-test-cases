import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCreateNewPasswordComponent } from 'src/app/components/admin-componets/admin-create-new-password/admin-create-new-password.component';
import { AdminDashboardComponent } from 'src/app/components/admin-componets/admin-dashboard/admin-dashboard.component';
import { AdminForgotPasswordComponent } from 'src/app/components/admin-componets/admin-forgot-password/admin-forgot-password.component';
import { AdminLoginComponent } from 'src/app/components/admin-componets/admin-login/admin-login.component';
import { AuthguardService } from 'src/app/services/authguard.service';

const routes: Routes = [
  {path :'AdminDashboard',component: AdminDashboardComponent,canActivate: [AuthguardService]},
  {path :'login',component: AdminLoginComponent},
  {
    path:'forgot-password',component:AdminForgotPasswordComponent
  },
  {
    path:'create-new-password',component:AdminCreateNewPasswordComponent
  },
  {path :'',component: AdminLoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModuleRoutingModule { }
