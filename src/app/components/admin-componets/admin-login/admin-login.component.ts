import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  adminForm: any;
  erroroccured: boolean = false;
  isSubmitted: boolean = false;
  errormessege: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private sharedservice: SharedServiceService
  ) {}

  ngOnInit(): void {
    this.adminForm = this.formBuilder.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w[a-z]{1,2})+$/
          ),
        ],
      ],
      loginPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@$%^&-]).{8,15}$'
          ),
        ],
      ],
    });
  }
  get f() {
    return this.adminForm.controls;
  }
  public hide: boolean = true;
  myFunction() {
    this.hide = !this.hide;
  }
  Login() {
    this.isSubmitted = true;
    if (this.adminForm.invalid) {
      return;
    }
    let requestObj = {
      email: this.adminForm.value.userName,
      password: this.adminForm.value.loginPassword,
    };

    this.authService.login(requestObj).subscribe(
      (data) => {
        if (data) {
          if (data.user.role == 'ADMIN') {
            if (data.user.hasLoggedIn == false) {
              this.router.navigate(['Admin/forgot-password']);
            } else {
              sessionStorage.setItem('admintoken', data.token);
              sessionStorage.setItem('adminEmailID', data.user.email);
              sessionStorage.setItem('name', data.user.name);
              this.router.navigate(['Admin/AdminDashboard']);
              Swal.fire('Success!', 'Admin Login Successful', 'success');
              this.loginbutton(data.user.name);
              // debugger
            }
          } else {
            this.erroroccured = true;
            this.errormessege = 'Unauthorized User';
          }
        }
      },
      (error) => {
        this.erroroccured = true;
        this.errormessege = error.error.errors;
        // Swal.fire('Error!', error.error.errors, 'error');
      }
    );
  }
  changePass() {
    this.router.navigate(['Admin/forgot-password']);
  }
  nonAdmin() {
    this.router.navigate(['user/login']);
  }
  loginbutton(name: any) {
    // TODO: implement login logic here
    this.sharedservice.setUserName(name);
    this.sharedservice.loggedin();
  }
}
