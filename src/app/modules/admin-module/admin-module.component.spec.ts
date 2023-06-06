import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModuleComponent } from './admin-module.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminModuleComponent', () => {
  let component: AdminModuleComponent;
  let fixture: ComponentFixture<AdminModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModuleComponent ],
      imports:[ReactiveFormsModule,HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
