import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentAllApointmentComponent } from './appointment-all-apointment.component';

describe('AppointmentAllApointmentComponent', () => {
  let component: AppointmentAllApointmentComponent;
  let fixture: ComponentFixture<AppointmentAllApointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentAllApointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentAllApointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
