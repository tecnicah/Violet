import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPaymentProcessComponent } from './dialog-payment-process.component';

describe('DialogPaymentProcessComponent', () => {
  let component: DialogPaymentProcessComponent;
  let fixture: ComponentFixture<DialogPaymentProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPaymentProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPaymentProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
