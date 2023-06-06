import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainModuleRoutingModule } from './main-module-routing.module';
import { MainPageComponent } from '../../components/main-page/main-page.component';
import {MatIconModule} from '@angular/material/icon';
import { MainModuleComponent } from './main-module.component';

@NgModule({
  declarations: [
    MainPageComponent,
    MainModuleComponent
  ],
  imports: [
    CommonModule,
    MainModuleRoutingModule,
    MatIconModule
  ]
})
export class MainModuleModule { }
