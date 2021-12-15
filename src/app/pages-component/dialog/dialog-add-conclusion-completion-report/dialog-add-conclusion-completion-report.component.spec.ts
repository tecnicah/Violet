import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAddConclusionCompletionReportComponent } from './dialog-add-conclusion-completion-report.component';

describe('DialogAddConclusionCompletionReportComponent', () => {
  let component: DialogAddConclusionCompletionReportComponent;
  let fixture: ComponentFixture<DialogAddConclusionCompletionReportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddConclusionCompletionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddConclusionCompletionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
