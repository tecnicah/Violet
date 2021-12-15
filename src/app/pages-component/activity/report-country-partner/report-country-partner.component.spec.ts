import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportCountryPartnerComponent } from './report-country-partner.component';

describe('ReportCountryPartnerComponent', () => {
  let component: ReportCountryPartnerComponent;
  let fixture: ComponentFixture<ReportCountryPartnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCountryPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCountryPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
