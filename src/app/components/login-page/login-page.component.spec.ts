import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let formBuilder: FormBuilder;
  let router: Router;
  let authService: AuthenticationService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [ReactiveFormsModule, RouterTestingModule,HttpClientModule],
      providers:[AuthenticationService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    // router = TestBed.inject(Router);
    authService = TestBed.inject(AuthenticationService);
    fixture.detectChanges();
    spyOn(sessionStorage, 'getItem').and.callFake((key: string) => {
      return key === 'token' ? 'TOKEN' : sessionStorage[key];
    });
    spyOn(sessionStorage, 'setItem').and.callFake((key: string, value: string) => {
      sessionStorage[key] = value;
    });
    sessionStorage.setItem('name', 'vishnu sai');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('userName')).toBeDefined();
    expect(component.loginForm.get('loginPassword')).toBeDefined();
  });
  //get form controls
  it('should return the controls of the loginForm', () => {
    const controls = component.f;
    expect(controls).toBeDefined();
    expect(controls.userName).toBeDefined();
    expect(controls.loginPassword).toBeDefined();
    expect(controls.userName.value).toEqual('');
    expect(controls.loginPassword.value).toEqual('');
    expect(controls.userName.validator).toBeDefined();
    expect(controls.loginPassword.validator).toBeDefined();
  });

  it('should update the form control values when modified', () => {
    const controls = component.f;
    controls.userName.setValue('test@example.com');
    controls.loginPassword.setValue('Test123@');
    expect(component.loginForm.value.userName).toEqual('test@example.com');
    expect(component.loginForm.value.loginPassword).toEqual('Test123@');
  });





  it('should mark form as invalid if submitted with empty fields', () => {
    component.Login();
    expect(component.isSubmitted).toBeTruthy();
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('should mark form as valid if submitted with valid fields', () => {
    const { loginForm } = component;
    const userNameControl = loginForm.controls.userName;
    const loginPasswordControl = loginForm.controls.loginPassword;

    userNameControl.setValue('test@example.com');
    loginPasswordControl.setValue('Test123@');

    expect(loginForm.valid).toBeTruthy();
  });

  it('should navigate to forgot password page when forgotPass() is called', () => {
    spyOn(component.router, 'navigate');
    component.forgotPass();
    expect(component.router.navigate).toHaveBeenCalledWith(['/user/forgot-password']);
  });

  it('should navigate to registration page when register() is called', () => {
    spyOn(component.router, 'navigate');
    component.register();
    expect(component.router.navigate).toHaveBeenCalledWith(['/user/registration']);
  });

  it('should navigate to admin login page when adminUser() is called', () => {
    spyOn(component.router, 'navigate');
    component.adminUser();
    expect(component.router.navigate).toHaveBeenCalledWith(['/Admin/login']);
  });

  it('should toggle the visibility of password field when myFunction() is called', () => {
    component.hide = true;
    component.myFunction();
    expect(component.hide).toBeFalsy();
    component.myFunction();
    expect(component.hide).toBeTruthy();
  });

  // Add more test cases to cover other functionalities and scenarios of the LoginComponent
  it('should handle successful login', () => {
    // Simulate a successful login response
    const response = {
      user: {
        email: "vishnusai.podili@archents.com",
        employeeID: "IARC0329",
        hasLoggedIn: false,
        isActive: true,
        name: "vishnu sai",
        role: "EMPLOYEE",
        _id: "6466219dd8c8042a27156b92",
      },
      token: 'TOKEN'
    };
    spyOn(authService, 'login').and.returnValue(of(response));
    // spyOn(router, 'navigate');
  
    component.Login();
  
    expect(sessionStorage.getItem('token')).toBe('TOKEN');
    // expect(sessionStorage.getItem('emailID')).toBe(response.user.email);
    expect(sessionStorage.getItem('name')).toBe('vishnu sai');
    // expect(sessionStorage.getItem('employeeID')).toBe(response.user.employeeID);
    // expect(router.navigate).toHaveBeenCalledWith(['main/mainpage']);
  });
  
});
