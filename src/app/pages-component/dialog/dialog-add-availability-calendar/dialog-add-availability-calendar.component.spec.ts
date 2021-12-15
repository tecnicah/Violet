import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAddAvailabilityCalendarComponent } from './dialog-add-availability-calendar.component';

describe('DialogAddAvailabilityCalendarComponent', () => {
  let component: DialogAddAvailabilityCalendarComponent;
  let fixture: ComponentFixture<DialogAddAvailabilityCalendarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddAvailabilityCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddAvailabilityCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
