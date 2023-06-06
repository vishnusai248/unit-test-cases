import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminModuleRoutingModule } from './admin-module-routing.module';
import { AdminLoginComponent } from 'src/app/components/admin-componets/admin-login/admin-login.component';
import { AdminDashboardComponent } from 'src/app/components/admin-componets/admin-dashboard/admin-dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AdminCreateNewPasswordComponent } from 'src/app/components/admin-componets/admin-create-new-password/admin-create-new-password.component';
import { AdminForgotPasswordComponent } from 'src/app/components/admin-componets/admin-forgot-password/admin-forgot-password.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { EditscreensComponent } from 'src/app/components/admin-componets/editscreens/editscreens.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AdminModuleComponent } from './admin-module.component';

@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminCreateNewPasswordComponent,
    AdminForgotPasswordComponent,
    EditscreensComponent,
    AdminModuleComponent,

  ],
  imports: [
    CommonModule,
    AdminModuleRoutingModule,
    FormsModule,
    MatDialogModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatIconModule,
    MatPaginatorModule,
    MatSlideToggleModule
  ]
})
export class AdminModuleModule { }
