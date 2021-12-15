import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogReportErrorComponent } from './dialog-report-error.component';

describe('DialogReportErrorComponent', () => {
  let component: DialogReportErrorComponent;
  let fixture: ComponentFixture<DialogReportErrorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogReportErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogReportErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
