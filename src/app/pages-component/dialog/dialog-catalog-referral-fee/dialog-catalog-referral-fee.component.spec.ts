import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCatalogReferralFeeComponent } from './dialog-catalog-referral-fee.component';

describe('DialogCatalogReferralFeeComponent', () => {
  let component: DialogCatalogReferralFeeComponent;
  let fixture: ComponentFixture<DialogCatalogReferralFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCatalogReferralFeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogReferralFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
