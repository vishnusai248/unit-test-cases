import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditscreensComponent } from './editscreens.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('EditscreensComponent', () => {
  let component: EditscreensComponent;
  let fixture: ComponentFixture<EditscreensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditscreensComponent ],
      imports:[HttpClientTestingModule,ReactiveFormsModule,RouterTestingModule,MatDialogModule],
      providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(EditscreensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
