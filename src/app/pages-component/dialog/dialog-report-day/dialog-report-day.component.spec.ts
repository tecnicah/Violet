import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogReportDayComponent } from './dialog-report-day.component';

describe('DialogReportDayComponent', () => {
  let component: DialogReportDayComponent;
  let fixture: ComponentFixture<DialogReportDayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogReportDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogReportDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
