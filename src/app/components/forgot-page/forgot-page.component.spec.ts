import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPageComponent } from './forgot-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('ForgotPageComponent', () => {
  let component: ForgotPageComponent;
  let fixture: ComponentFixture<ForgotPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPageComponent ],
      imports:[HttpClientTestingModule,ReactiveFormsModule]

    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
