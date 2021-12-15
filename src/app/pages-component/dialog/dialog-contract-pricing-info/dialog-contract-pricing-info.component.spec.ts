import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogContractPricingInfoComponent } from './dialog-contract-pricing-info.component';

describe('DialogContractPricingInfoComponent', () => {
  let component: DialogContractPricingInfoComponent;
  let fixture: ComponentFixture<DialogContractPricingInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogContractPricingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContractPricingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
