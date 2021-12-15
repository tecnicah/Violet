import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LegalRenewalComponent } from './legal-renewal.component';

describe('LegalRenewalComponent', () => {
  let component: LegalRenewalComponent;
  let fixture: ComponentFixture<LegalRenewalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalRenewalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalRenewalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
