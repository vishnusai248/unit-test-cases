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
});
