import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewPasswordComponent } from './create-new-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('CreateNewPasswordComponent', () => {
  let component: CreateNewPasswordComponent;
  let fixture: ComponentFixture<CreateNewPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewPasswordComponent ],
      imports:[HttpClientTestingModule,ReactiveFormsModule]

    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewPasswordComponent);
    component = fixture.componentInstance;
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
  it('should return the controls of the loginForm', () => {
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
});
