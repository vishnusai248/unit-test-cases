import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-page',
  templateUrl: './forgot-page.component.html',
  styleUrls: ['./forgot-page.component.css']
})
export class ForgotPageComponent implements OnInit{
  forgotPasswordForm: FormGroup;
  constructor( private formBuilder:FormBuilder,private authService:AuthenticationService,private router:Router){
    this.forgotPasswordForm=this.formBuilder.group({
      phoneNumber:['',[Validators.required,Validators.pattern('^[6789][0-9]{9}$')]],
    })
  }
  ngOnInit(): void {
    
  }
  get f(){
    return this.forgotPasswordForm.controls;
  }
  getOTP() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    let requestObj = {
      phoneNumber: this.forgotPasswordForm.value.phoneNumber
    }
   
    sessionStorage.setItem('mobileNo',this.forgotPasswordForm.value.phoneNumber)
    this.authService.getotp(requestObj).subscribe((response) => {
   
      if (response) {
       
        sessionStorage.setItem('sid',response.verificationSID)
 
        if(response.verificationStatus=='Success'){
          this.router.navigate(['user/create-newpassword']);
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
    this.router.navigate(['user/login'])
  }
  
}
