import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-forgot-password',
  templateUrl: './admin-forgot-password.component.html',
  styleUrls: ['./admin-forgot-password.component.css']
})
export class AdminForgotPasswordComponent implements OnInit {
  adminChangePasswordForm: FormGroup;
  constructor( private formBuilder:FormBuilder,private authService:AuthenticationService,private router:Router){
    this.adminChangePasswordForm=this.formBuilder.group({
      phoneNumber:['',[Validators.required,Validators.pattern('^[789][0-9]{9}$')]],
    })
  }
  ngOnInit(): void {
    
  }
  get f(){
    return this.adminChangePasswordForm.controls;
  }
  getOTP() {
    if (this.adminChangePasswordForm.invalid) {
      return;
    }
    let requestObj = {
      phoneNumber: this.adminChangePasswordForm.value.phoneNumber
    }
   
    sessionStorage.setItem('mobileNo',this.adminChangePasswordForm.value.phoneNumber)
    this.authService.getotp(requestObj).subscribe((response) => {
      if (response) {
        console.log("response:",response)
        sessionStorage.setItem('sid',response.verificationSID)
        if(response.verificationStatus=='Success'){
          this.router.navigate(['Admin/create-new-password']);
          Swal.fire('Success','OTP Sent','success')
        }
        else if(response.errors){
          Swal.fire('Error !',response.errors,'error')
        }

      }
    }, (error) => {
      
    })




  }
  numberOnlyOtp(event:any){
   
    if(event.charCode>57 || event.charCode<48){
      event.preventDefault();
    }
  }
  backtologin(){
    this.router.navigate(['Admin/login'])
  }
  

}
