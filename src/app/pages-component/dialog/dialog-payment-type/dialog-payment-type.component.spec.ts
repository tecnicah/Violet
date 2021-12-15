import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogPaymentTypeComponent } from './dialog-payment-type.component';

describe('DialogPaymentTypeComponent', () => {
  let component: DialogPaymentTypeComponent;
  let fixture: ComponentFixture<DialogPaymentTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPaymentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPaymentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
