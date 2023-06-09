import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewPasswordComponent } from './create-new-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';
import { of, throwError } from 'rxjs';

describe('CreateNewPasswordComponent', () => {
  let component: CreateNewPasswordComponent;
  let fixture: ComponentFixture<CreateNewPasswordComponent>;
  let router:Router;
  let authService:AuthenticationService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewPasswordComponent ],
      imports:[HttpClientTestingModule,ReactiveFormsModule],
      providers:[Router,AuthenticationService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewPasswordComponent);
    component = fixture.componentInstance;
    router=TestBed.inject(Router)
    authService=TestBed.inject(AuthenticationService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    expect(component.CreatePasswordForm.value).toEqual({
      otp:'',
      password:'',
      confirmPassword:'',
    });
  });

  it('should make the form invalid when fields are empty', () => {
    const form = component.CreatePasswordForm;
    expect(form.valid).toBeFalsy();
    expect(form.controls['otp'].valid).toBeFalsy();
    expect(form.controls['password'].valid).toBeFalsy();
    expect(form.controls['confirmPassword'].valid).toBeFalsy();
  });
it('should update the form control values when modified', () => {
    const controls = component.f;
    controls['otp'].setValue('123456');
    controls['password'].setValue('Abcd@123');
    controls['confirmPassword'].setValue('Abcd@123');
    expect(component.CreatePasswordForm.value.otp).toEqual('123456');
    expect(component.CreatePasswordForm.value.password).toEqual('Abcd@123');
    expect(component.CreatePasswordForm.value.confirmPassword).toEqual('Abcd@123');


  });

  //get form controls
  it('should return the controls of the createnewpasswordForm', () => {
    const controls = component.f;
    expect(controls).toBeDefined();
    expect(controls['otp']).toBeDefined();
    expect(controls['password']).toBeDefined();
    expect(controls['confirmPassword']).toBeDefined();

    expect(controls['otp'].value).toEqual('');
    expect(controls['password'].value).toEqual('');
    expect(controls['confirmPassword'].value).toEqual('');

    expect(controls['otp'].validator).toBeDefined();
    expect(controls['password'].validator).toBeDefined();
    expect(controls['confirmPassword'].validator).toBeDefined();
  });
  it('should require otp field to be filled', () => {
    const form = component.CreatePasswordForm;
    const nameControl = form.controls['otp'];
    // Case 1: otp field is empty
    nameControl.setValue('');
    expect(nameControl.hasError('required')).toBeTruthy();
    expect(nameControl.hasError('minlength')).toBeFalsy(); 
  });

it('should match the password pattern', () => {
    const form = component.CreatePasswordForm;
    const passwordControl = form.controls['password'];
    passwordControl.setValue('Sc12');
    expect(passwordControl.hasError('pattern')).toBeTruthy();
  });
  it ('confirm password should match with password',()=>{
    const form = component.CreatePasswordForm;
    const confirmpasswordControl= form.controls['confirmPassword'];
    confirmpasswordControl.setValue('Sc@123');
    expect(confirmpasswordControl.hasError('match')).toBeFalsy();
  })

  it('should navigate to forgotpassword page when changemobile() is called', () => {
    const routerSpy = spyOn(router, 'navigate');
    component.changemobile();
    expect(routerSpy).toHaveBeenCalledWith(['user/forgot-password']);
  });

  it('should allow only numeric characters for otp field ', () => {
    const event = { charCode: 50, preventDefault: jasmine.createSpy() };
    component.numberOnlyOtp(event);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });
  it('should toggle the visibility of password field when passwordhide() is called', () => {
    component.hide = true;
    component.passwordhide();
    expect(component.hide).toBeFalsy();
    component.passwordhide();
    expect(component.hide).toBeTruthy();
  });
  it('should toggle the visibility of confirm password field when confirmhide() is called', () => {
    component.confirm_hide = true;
    component.confirmhide();
    expect(component.confirm_hide).toBeFalsy();
    component.confirmhide();
    expect(component.confirm_hide).toBeTruthy();
  });

  it('should resend otp and display success message when resendOTP() is called', () => {
    const getotpSpy = spyOn(authService, 'getotp').and.returnValue(of({ verificationStatus: 'Success' }));
    const swalSpy = spyOn(Swal, 'fire');
    component.resendOTP();
    expect(getotpSpy).toHaveBeenCalled();
    expect(swalSpy).toHaveBeenCalledWith('Success', 'OTP Sent', 'success');
  });
  
  it('should set isSubmitted to true and return early if form is invalid', () => {
    component.isSubmitted = false;
    spyOnProperty(component.CreatePasswordForm, 'invalid', 'get').and.returnValue(true);
    spyOn(authService,'reset')
    spyOn(Swal, 'fire');
    spyOn(router,'navigate');
    component.submit();
    expect(component.isSubmitted).toBeTrue();
    expect(authService.reset).not.toHaveBeenCalled();
    expect(Swal.fire).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
  it('should call authService reset() and show success message when form is valid after call of submit()', () => {
    const resetResponse = {};
    spyOnProperty(component.CreatePasswordForm, 'invalid', 'get').and.returnValue(false);
    spyOn(sessionStorage, 'getItem').and.returnValue('someSID');
    spyOn(Swal, 'fire');
    spyOn(router,'navigate');
    component.CreatePasswordForm.setValue({
      otp: '123456',
      password: 'Test@123',
      confirmPassword: 'Test@123',
    });
    spyOn(authService, 'reset').and.returnValue(of(resetResponse));
    component.submit();
    expect(authService.reset).toHaveBeenCalledWith({
      sid: 'someSID',
      code: '123456',
      phoneNumber: component.mobileNo,
      password: 'Test@123',
    });
    expect(Swal.fire).toHaveBeenCalledWith('Success!', 'Password Reset Successful', 'success');
    expect(router.navigate).toHaveBeenCalledWith(['user/login']);
  });
  it('should handle error from backend in the submit() function', () => {
    const errorResponse = { error: { errors: 'Invalid OTP' } };
    spyOnProperty(component.CreatePasswordForm, 'invalid', 'get').and.returnValue(false);
    spyOn(sessionStorage, 'getItem').and.returnValue('someSID');
    component.CreatePasswordForm.setValue({
      otp: '123456',
      password: 'Test@123',
      confirmPassword: 'Test@123',
    });
    spyOn(authService, 'reset').and.returnValue(throwError(errorResponse));
    spyOn(Swal, 'fire');
    spyOn(router, 'navigate');
  
    component.submit();
  
    
    expect(authService.reset).toHaveBeenCalledWith({
      sid: 'someSID',
      code: '123456',
      phoneNumber: component.mobileNo,
      password: 'Test@123',
    });
    expect(component.otpvalidation).toBeTrue();
    expect(component.errormessege).toEqual('Invalid OTP');
    expect(Swal.fire).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
  
  
});
