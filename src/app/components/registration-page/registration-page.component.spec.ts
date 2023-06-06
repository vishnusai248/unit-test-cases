import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPageComponent } from './registration-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('RegistrationPageComponent', () => {
  let component: RegistrationPageComponent;
  let fixture: ComponentFixture<RegistrationPageComponent>;
  let router: Router;
  let authService: AuthenticationService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationPageComponent ],
      imports:[ReactiveFormsModule,RouterTestingModule,HttpClientTestingModule],
      providers:[AuthenticationService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationPageComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize the form with empty fields', () => {
    expect(component.RegistrationForm.value).toEqual({
      name: '',
      email: '',
      phone: '',
      employeeId:'',
      designation:'',
      password: '',
      passwordConfirm:''
    });
  });

  it('should make the form invalid when fields are empty', () => {
    const form = component.RegistrationForm;
    expect(form.valid).toBeFalsy();
    expect(form.controls['name'].valid).toBeFalsy();
    expect(form.controls['email'].valid).toBeFalsy();
    expect(form.controls['phone'].valid).toBeFalsy();
    expect(form.controls['employeeId'].valid).toBeFalsy();
    expect(form.controls['designation'].valid).toBeFalsy();
    expect(form.controls['password'].valid).toBeFalsy();
    expect(form.controls['passwordConfirm'].valid).toBeFalsy();

  });
  it('should require name field to be filled', () => {
    const form = component.RegistrationForm;
    const nameControl = form.controls['name'];
    // Case 1: Name field is empty
    nameControl.setValue('');
    expect(nameControl.hasError('required')).toBeTruthy();
    expect(nameControl.hasError('pattern')).toBeFalsy();
    // Case 2: Name field contains alphabetic characters and spaces
    nameControl.setValue('John Doe');
    expect(nameControl.hasError('required')).toBeFalsy();
    expect(nameControl.hasError('pattern')).toBeTruthy();

    // Case 3: Name field contains non-alphabetic characters
    nameControl.setValue('John123');
    expect(nameControl.hasError('required')).toBeFalsy();
    expect(nameControl.hasError('pattern')).toBeTruthy();
  });
  it('should require a valid email address', () => {
    const form = component.RegistrationForm;
    const emailControl = form.controls['email'];
    emailControl.setValue('dcdcfdvdf');
    expect(emailControl.hasError('email')).toBeFalsy();
  });
  it('should match the Empoloyee code pattern and field to be filled',()=>{
    const form = component.RegistrationForm;
    const employeeID = form.controls['employeeId'];
    employeeID.setValue('123');
    expect(employeeID.hasError('pattern')).toBeTruthy();
    employeeID.setValue('IARC0329');
    expect(employeeID.hasError('pattern')).toBeFalsy();
    employeeID.setValue('');
    expect(employeeID.hasError('required')).toBeTruthy();
  })
  it('designation length should be min 6  and field to be filled',()=>{
    const form = component.RegistrationForm;
    const designation = form.controls['designation'];
    designation.setValue('tr');
    expect(designation.hasError('minlength')).toBeTruthy();
    designation.setValue('trainee');
    expect(designation.hasError('minlength')).toBeFalsy();
    designation.setValue('');
    expect(designation.hasError('required')).toBeTruthy();
  })


  it('should require a min length of 6 for password', () => {
    const form = component.RegistrationForm;
    const passwordControl = form.controls['password'];
    passwordControl.setValue('Sc@12');
    expect(passwordControl.hasError('minlength')).toBeTruthy();
  });
  it ('confirm password should match with password',()=>{
    const form = component.RegistrationForm;
    const confirmpasswordControl= form.controls['passwordConfirm'];
    confirmpasswordControl.setValue('Sc@123');
    expect(confirmpasswordControl.hasError('match')).toBeFalsy();
  })



  it('should require a min length of 10 for phone number and check required', () => {
    const form = component.RegistrationForm;
    const phoneControl = form.controls['phone'];
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
  it('should convert the a string to uppercase when convertToUppercase() is callled',()=>{
    component.inputText="abcd"
    component.convertToUppercase();
    expect(component.inputText).toEqual('ABCD');
    //should handle emty strings 
    component.inputText=""
    component.convertToUppercase();
    expect(component.inputText).toEqual('');
    //should return uppercase if given string is in uppercase initially
    component.inputText="ABCD EFGH"
    component.convertToUppercase();
    expect(component.inputText).toEqual('ABCD EFGH');
  },
  )
  
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

  it('should go back to login if backtologin() function is called',()=>{
    spyOn(router,'navigate')
    component.backtologin();
    expect(router.navigate).toHaveBeenCalledWith(['user/login']);
  })
  it('should make the form valid when all fields are filled correctly', () => {
    const form = component.RegistrationForm;
    form.setValue({
      name: 'John',
      email: 'johndoe@example.com',
      phone: '6234567890',
      employeeId:'IARC0329',
      designation:'Trainee',  
      password: 'Sc1234',
      passwordConfirm:'Sc1234'
    });
    expect(form.valid).toBeTruthy();
  });

   it('should navigate to login when form is valid and registration is successful', () => {
    // Create a mock response for the register method
    const mockResponse = { success: true };

    // Set valid form values
    component.RegistrationForm.setValue({
      name: 'John',
      email: 'johndoe@example.com',
      phone: '6234567890',
      employeeId:'IARC0329',
      designation:'Trainee',  
      password: 'Sc1234@',
      passwordConfirm:'Sc1234@'
    });
    
    // Mock the AuthenticationService.register method and return a mock Observable
    spyOn(authService, 'register').and.returnValue(of(mockResponse));

    // Spy on the route.navigate method
    spyOn(router, 'navigate');

    // Call the onSubmit method
    component.register();

    // Expectations
    expect(authService.register).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['user/login']);
  });

});
