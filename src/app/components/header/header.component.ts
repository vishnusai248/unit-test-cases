import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  name: any = '';
  constructor(public authService:AuthenticationService,private router:Router,public sharedservice:SharedServiceService){
    this.sharedservice.userName.subscribe((userName) => {
      this.name = userName;
    });
  }
  ngOnInit(): void {
    this.name = sessionStorage.getItem('name')

  }
  logo_click() {
    // this.router.navigate(['user/login'])
    const currentUrl: string = this.router.url;
    if (currentUrl.startsWith('/Admin/')) {
      if(!this.sharedservice.isloggedIn){
        this.router.navigate(['/Admin/login'])
      }
    } else if(currentUrl.startsWith('/main/')) {
      if(!this.sharedservice.isloggedIn){

        this.router.navigate(['/main/mainpage'])
      }
    }
    else{
      this.router.navigate(['/user/login'])
    }
  }
  logout() {
    const currentUrl: string = this.router.url;
    if (currentUrl.startsWith('/Admin/')) {
      this.router.navigate(['/Admin/login'])
    }
    else{
      this.router.navigate(['/user/login'])
    }
    sessionStorage.clear();
    this.sharedservice.loggedout()
  }
}
