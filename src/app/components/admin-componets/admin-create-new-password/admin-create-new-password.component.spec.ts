import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateNewPasswordComponent } from './admin-create-new-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('AdminCreateNewPasswordComponent', () => {
  let component: AdminCreateNewPasswordComponent;
  let fixture: ComponentFixture<AdminCreateNewPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateNewPasswordComponent ],
      imports:[HttpClientTestingModule,ReactiveFormsModule]

    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreateNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
