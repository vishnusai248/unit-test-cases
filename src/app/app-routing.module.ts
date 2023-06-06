import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from './services/authguard.service';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: 'user', loadChildren: () => import('./modules/user-module/user-module.module').then(m => m.UserModuleModule) },
  {path: 'main', loadChildren: () => import('./modules/main-module/main-module.module').then(m => m.MainModuleModule),canActivate: [AuthguardService]},
  {path: 'Admin', loadChildren: () => import('./modules/admin-module/admin-module.module').then(m => m.AdminModuleModule)},
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent } // This route will match any unknown path

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
