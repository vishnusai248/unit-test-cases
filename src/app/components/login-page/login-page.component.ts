import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
loginForm: any;
erroroccured:boolean=false
isSubmitted: boolean=false;
errormessege: any;
currenturl:any;

constructor( private formBuilder:FormBuilder,public router:Router,private authService : AuthenticationService,private sharedservice: SharedServiceService){

}

ngOnInit(): void {

  this.currenturl = this.router.url;
  this.loginForm = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w[a-z]{1,2})+$/)]],
    loginPassword: ['', [Validators.required,
    Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@$%^&-]).{8,15}$')]],

  });
}
get f() {
   return this.loginForm.controls; 
  }

  Login() {
    //console.log('login', this.loginForm)
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    let requestObj = {
      email: this.loginForm.value.userName,
      password: this.loginForm.value.loginPassword,
    }

    this.authService.login(requestObj).subscribe((data) => {
      //console.log(data)
      if (data.user.role == 'EMPLOYEE') {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('emailID', data.user.email);
        sessionStorage.setItem('name',data.user.name);
        sessionStorage.setItem('employeeID',data.user.employeeID)
        this.router.navigate(['main/mainpage']);
        // Swal.fire('Success!',"Login Successful",'success')
        this.loginbutton(data.user.name)
        
      }
      else{
        this.erroroccured=true
        this.errormessege="No User found"
      }
    }, (error) => {
        this.erroroccured=true
        this.errormessege=error.error.errors;
      // Swal.fire('Error!', error.error.errors, 'error');
    })




  }
forgotPass() {
  this.router.navigate(['/user/forgot-password']);
}
register() {
  this.router.navigate(['/user/registration']);
}
adminUser() {
  this.router.navigate(['/Admin/login']);
}
public hide: boolean = true;
myFunction() {
  this.hide = !this.hide;
}
loginbutton(name:any) {
  // TODO: implement login logic here
  this.sharedservice.setUserName(name);
  this.sharedservice.loggedin();
}
}
