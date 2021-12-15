import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCompletionReportImmigrationComponent } from './dialog-completion-report-immigration.component';

describe('DialogCompletionReportImmigrationComponent', () => {
  let component: DialogCompletionReportImmigrationComponent;
  let fixture: ComponentFixture<DialogCompletionReportImmigrationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCompletionReportImmigrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCompletionReportImmigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
