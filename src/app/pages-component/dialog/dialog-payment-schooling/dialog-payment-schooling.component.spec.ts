import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPaymentSchoolingComponent } from './dialog-payment-schooling.component';

describe('DialogPaymentSchoolingComponent', () => {
  let component: DialogPaymentSchoolingComponent;
  let fixture: ComponentFixture<DialogPaymentSchoolingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPaymentSchoolingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPaymentSchoolingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
