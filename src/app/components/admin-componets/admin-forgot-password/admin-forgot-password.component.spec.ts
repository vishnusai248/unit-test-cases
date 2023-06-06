import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminForgotPasswordComponent } from './admin-forgot-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('AdminForgotPasswordComponent', () => {
  let component: AdminForgotPasswordComponent;
  let fixture: ComponentFixture<AdminForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminForgotPasswordComponent ],
      imports:[HttpClientTestingModule,ReactiveFormsModule]

    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
