import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPageComponent } from './forgot-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

describe('ForgotPageComponent', () => {
  let component: ForgotPageComponent;
  let fixture: ComponentFixture<ForgotPageComponent>;
  let router:Router
  let authService:AuthenticationService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPageComponent ],
      imports:[HttpClientTestingModule,ReactiveFormsModule,RouterTestingModule],
      providers:[Router,AuthenticationService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    authService=TestBed.inject(AuthenticationService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    expect(component.forgotPasswordForm.value).toEqual({
      phoneNumber:''
    });
  });

  it('should make the form invalid when fields are empty', () => {
    const form = component.forgotPasswordForm;
    expect(form.valid).toBeFalsy();
    expect(form.controls['phoneNumber'].valid).toBeFalsy();
    
  });
it('should update the form control values when modified', () => {
    const controls = component.f;
    controls['phoneNumber'].setValue('9652941132');
    expect(component.forgotPasswordForm.value.phoneNumber).toEqual('9652941132');
  });

  //get form controls
  it('should return the controls of the loginForm', () => {
    const controls = component.f;
    expect(controls).toBeDefined();
    expect(controls['phoneNumber']).toBeDefined();
    expect(controls['phoneNumber'].value).toEqual('');
    expect(controls['phoneNumber'].validator).toBeDefined();
  });

  it('should require a min length of 10 for phone number and check required', () => {
    const form = component.forgotPasswordForm;
    const phoneControl = form.controls['phoneNumber'];
    phoneControl.setValue('');
    expect(phoneControl.hasError('required')).toBeTruthy();
    phoneControl.setValue('6123456789');
    expect(phoneControl.hasError('pattern')).toBeFalsy();
    phoneControl.setValue('123');
    expect(phoneControl.hasError('pattern')).toBeTruthy();
    phoneControl.setValue('1234567890');
    expect(phoneControl.hasError('pattern')).toBeTruthy();
    phoneControl.setValue('abcd');
    expect(phoneControl.hasError('pattern')).toBeTruthy();

    // expect(phoneControl.hasError('minlength')).toBeTruthy();
    // phoneControl.setValue('12345678900');
    // expect(phoneControl.hasError('maxlength')).toBeTruthy();
  });
  it('should allow numeric characters', () => {
    const event = { charCode: 50, preventDefault: jasmine.createSpy() };
    component.numberOnlyOtp(event);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('should prevent non-numeric characters', () => {
    const event = { charCode: 65, preventDefault: jasmine.createSpy() };
    component.numberOnlyOtp(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });
  it('should go back to login if backtologin() function is called',()=>{
    spyOn(router,'navigate')
    component.backtologin();
    expect(router.navigate).toHaveBeenCalledWith(['user/login']);
  });
  it('should set sessionStorage and navigate on successful OTP response',()=>{
    const phoneNumber='8688476418';
    const response={
      verificationSID: 'verificationSID',
      verificationStatus: 'Success'
    };
    spyOn(sessionStorage,'setItem');
    spyOn(authService, 'getotp').and.returnValue(of(response)); 
    spyOn(router,'navigate');
    spyOn(Swal,'fire');
    component.forgotPasswordForm.setValue({phoneNumber})
    component.getOTP();
    expect(component.forgotPasswordForm.invalid).toBe(false);
    expect(authService.getotp).toHaveBeenCalledWith({phoneNumber});
    expect(sessionStorage.setItem).toHaveBeenCalledWith('mobileNo', phoneNumber);
    expect(sessionStorage.setItem).toHaveBeenCalledWith('sid', response.verificationSID);
    expect(router.navigate).toHaveBeenCalledWith(['user/create-newpassword']);
    expect(Swal.fire).toHaveBeenCalledWith('Success', 'OTP Sent', 'success');

   });
   it("should not call authsertvice if form is invalid when getotp() is called",()=>{
    const phoneNumber='1234567891';
    spyOn(authService, 'getotp');
    component.forgotPasswordForm.setValue({phoneNumber})
    component.getOTP();
    expect(authService.getotp).not.toHaveBeenCalled();

   })

});
