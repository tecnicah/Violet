import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogPropertyReportComponent } from './dialog-property-report.component';

describe('DialogPropertyReportComponent', () => {
  let component: DialogPropertyReportComponent;
  let fixture: ComponentFixture<DialogPropertyReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPropertyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPropertyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
