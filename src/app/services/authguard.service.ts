import { Injectable } from '@angular/core';
import { SharedServiceService } from './shared-service.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {
  currentpath:any
  constructor(private sharedService: SharedServiceService, private router: Router,private location :Location) {
  }

  canActivate(route:ActivatedRouteSnapshot) {
  // debugger
    this.currentpath = this.location.path();
    const token=sessionStorage.getItem('token')
    const admintoken=sessionStorage.getItem('admintoken')
    if(this.currentpath.startsWith('/Admin/')){
      if(admintoken!=null){
        return true;
      }
      else{
        this.router.navigate(['Admin/login'])
        return false
      }
    }
    else{
      if(token !=null ){
        return true;
      }  
      else{
        this.router.navigate(['user/login'])
        return false
      }
    }
    
  }
}
