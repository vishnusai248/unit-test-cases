import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Validation from 'src/app/confirmedValidator';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html',
  styleUrls: ['./create-new-password.component.css']
})
export class CreateNewPasswordComponent {
  adminCreatePasswordForm: FormGroup;
  mobileNo:any;
  otpvalidation:boolean=false
  errormessege:any
  timeLeft: number = 120;
  interval:any;
  hideTime: boolean = true;
  hideResend: boolean=false;
  isSubmitted:boolean=false;
  constructor(private formBuilder: FormBuilder,private router: Router,private authService:AuthenticationService) {
    this.mobileNo=sessionStorage.getItem('mobileNo')
    this.adminCreatePasswordForm = this.formBuilder.group(
      {
        otp:['',[Validators.required]],
        password: ['',[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@$%^&-]).{8,15}$')]
        ],
        confirmPassword: ['', Validators.required],
      
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }

  ngOnInit(): void {
    this.resendTimer()
  }
  
  get f() {
    return this.adminCreatePasswordForm.controls;
  }
  changemobile(){
    this.router.navigate(['user/forgot-password'])
  }
  resendOTP() {
  
    let requestObj = {
      phoneNumber: this.mobileNo
    }
    this.authService.getotp(requestObj).subscribe((response) => {
    
      if (response) {
        clearInterval(this.interval);
        this.resendTimer()
        sessionStorage.setItem('sid',response.verificationSID)
        if(response.verificationStatus=='Success'){

          Swal.fire('Success','OTP Sent','success')
        }

      }
    }, (error) => {
     

    })




  }
  submit() {
    this.isSubmitted = true;
    if (this.adminCreatePasswordForm.invalid) {
      return;
    }
    let requestObj = {
      sid: sessionStorage.getItem('sid'),
      code: this.adminCreatePasswordForm.value.otp,
      phoneNumber: this.mobileNo,
      password: this.adminCreatePasswordForm.value.password  
    }
    
    this.authService.reset(requestObj).subscribe((response) => {
      if (response) {
        Swal.fire('Success!','Password Reset Successful','success')
        this.router.navigate(['user/login'])
        
      }

    }, (error) => {
      this.otpvalidation=true
      this.errormessege=error.error.errors
      

    })
  }
  
  backtologin(){
    this.router.navigate(['user/login'])
  }

  public hide: boolean = true;
  passwordhide() {
    this.hide = !this.hide;   
}
confirm_hide: boolean=true;
  confirmhide(){
    this.confirm_hide=!this.confirm_hide
  }

  numberOnlyOtp(event:any){
    
    if(event.charCode>57 || event.charCode<48){
      event.preventDefault();
    }
  }
  resendTimer() {

    this.timeLeft = 120;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.hideTime = true;
        this.hideResend = false;
      } else {
        this.timeLeft = 0;
        this.hideTime = false;
        this.hideResend = true;
        clearInterval(this.interval)
      }
    }, 1000);


  }
}