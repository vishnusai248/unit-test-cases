import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainModuleComponent } from './main-module.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MainModuleComponent', () => {
  let component: MainModuleComponent;
  let fixture: ComponentFixture<MainModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainModuleComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
