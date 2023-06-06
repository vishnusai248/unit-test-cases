import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Validation from 'src/app/confirmedValidator';
// import { MustMatch } from 'src/app/confirmedValidator';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent {
  RegistrationForm: FormGroup<any>;
  isSubmitted: boolean = false;
  inputText: string = '';


  constructor(private formbuilder: FormBuilder, private authService: AuthenticationService, private router: Router) {



    this.RegistrationForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w[a-z]{1,2})+$/)]],
      phone: ['', [Validators.required, Validators.pattern('^[6789][0-9]{9}$')
        // ,Validators.minLength(10),Validators.maxLength(10)
      ]],
      employeeId: ['', [Validators.required, Validators.pattern('IARC[0-9]{4}')]],
      designation: ['', [Validators.required, Validators.minLength(3)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ],
      ],
      passwordConfirm: ['', [Validators.required],]
    },
      {
        validators: [Validation.match('password', 'passwordConfirm')]
      }
    );

  }
  get f() {
    return this.RegistrationForm.controls;
  }

  register() {
    this.isSubmitted = true;

    if (this.RegistrationForm.invalid) {
      return;
    }
    let reqObj = {
      email: this.RegistrationForm.value.email,
      phoneNumber: this.RegistrationForm.value.phone,
      name: this.RegistrationForm.value.name,
      password: this.RegistrationForm.value.password,
      employeeID: this.RegistrationForm.value.employeeId,
      designation: this.RegistrationForm.value.designation,
      role: 'EMPLOYEE',
    }

    this.authService.register(reqObj).subscribe((response) => {
      //console.log(data);

      if (response) {
        // console.log(response)
        Swal.fire('Success!', response.message, 'success')
        this.router.navigate(['user/login']);
      }

    }, (error) => {
      Swal.fire('Info!', error.error.errors, 'error');


    })
  }
  convertToUppercase() {
    this.inputText = this.inputText.toUpperCase();
  }
  backtologin() {
    this.router.navigate(['user/login'])
  }
  public hide: boolean = true;
  passwordhide() {
    this.hide = !this.hide;
  }
  confirm_hide: boolean = true;
  confirmhide() {
    this.confirm_hide = !this.confirm_hide
  }
}
