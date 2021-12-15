import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAddAppointmentComponent } from './dialog-add-appointment.component';

describe('DialogAddAppointmentComponent', () => {
  let component: DialogAddAppointmentComponent;
  let fixture: ComponentFixture<DialogAddAppointmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
