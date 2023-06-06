import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { SharedServiceService } from './services/shared-service.service';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'all-portals';
  namedisplay: boolean = false;
  token: any;
  constructor(private router: Router, public authService: AuthenticationService,public sharedservice: SharedServiceService,private sessionService:SessionService) {
      this.token = sessionStorage.getItem('token')
      // console.log("loggedin:",this.sharedservice.isloggedIn)
   
  }
  @HostListener('window:mousemove') refreshSession() {
    this.sessionService.resetTimer();
  }
 
 
}
