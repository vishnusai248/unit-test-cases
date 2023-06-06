import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit{
  constructor(private router:Router,private location: Location){

  }
  ngOnInit(): void {
  }

  // home(){
  //   this.router.navigate(['user/login']);
  //   sessionStorage.clear()
  // }
  goBack(): void {
    this.location.back();
  }
  
}
