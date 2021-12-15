import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationCalendarComponent } from './confirmation-calendar.component';

describe('ConfirmationCalendarComponent', () => {
  let component: ConfirmationCalendarComponent;
  let fixture: ComponentFixture<ConfirmationCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
