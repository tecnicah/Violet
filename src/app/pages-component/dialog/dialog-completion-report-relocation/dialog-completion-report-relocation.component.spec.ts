import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCompletionReportRelocationComponent } from './dialog-completion-report-relocation.component';

describe('DialogCompletionReportRelocationComponent', () => {
  let component: DialogCompletionReportRelocationComponent;
  let fixture: ComponentFixture<DialogCompletionReportRelocationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCompletionReportRelocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCompletionReportRelocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
