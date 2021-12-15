import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAvailabilityCalendarComponent } from './dialog-availability-calendar.component';

describe('DialogAvailabilityCalendarComponent', () => {
  let component: DialogAvailabilityCalendarComponent;
  let fixture: ComponentFixture<DialogAvailabilityCalendarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAvailabilityCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAvailabilityCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
