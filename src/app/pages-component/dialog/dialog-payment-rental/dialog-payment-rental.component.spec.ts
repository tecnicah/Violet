import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPaymentRentalComponent } from './dialog-payment-rental.component';

describe('DialogPaymentRentalComponent', () => {
  let component: DialogPaymentRentalComponent;
  let fixture: ComponentFixture<DialogPaymentRentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPaymentRentalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPaymentRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
