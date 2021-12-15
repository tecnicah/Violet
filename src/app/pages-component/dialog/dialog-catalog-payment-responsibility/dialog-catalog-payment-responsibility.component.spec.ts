import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogPaymentResponsibilityComponent } from './dialog-catalog-payment-responsibility.component';

describe('DialogCatalogPaymentResponsibilityComponent', () => {
  let component: DialogCatalogPaymentResponsibilityComponent;
  let fixture: ComponentFixture<DialogCatalogPaymentResponsibilityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogPaymentResponsibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogPaymentResponsibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
