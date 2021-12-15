import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogReportOfDayComponent } from './dialog-report-of-day.component';

describe('DialogReportOfDayComponent', () => {
  let component: DialogReportOfDayComponent;
  let fixture: ComponentFixture<DialogReportOfDayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogReportOfDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogReportOfDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
