import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportByStatusComponent } from './report-by-status.component';

describe('ReportByStatusComponent', () => {
  let component: ReportByStatusComponent;
  let fixture: ComponentFixture<ReportByStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportByStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportByStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
