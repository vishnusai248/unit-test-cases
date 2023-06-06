import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from './shared-service.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private timeout: any;
  currentPath:any;
  constructor( private router:Router,private sharedservice: SharedServiceService) { 
    
  }
  resetTimer(): void {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      // Call a function to handle the session timeout
      this.handleTimeout();
    }, 10 * 60 * 1000); // 10 minutes in milliseconds
  }

  handleTimeout(): void {
    // Perform any actions you need to do on session timeout
    // For example, you can navigate to a login page or show a timeout dialog
    this.currentPath = this.router.url;
    sessionStorage.clear();
    this.sharedservice.loggedout()
    if(this.currentPath=='/main/mainpage'){
      this.router.navigate(['user/login'])
    }
    else if(this.currentPath=='/Admin/AdminDashboard'){
      this.router.navigate(['Admin/login'])
    }

  }
}
