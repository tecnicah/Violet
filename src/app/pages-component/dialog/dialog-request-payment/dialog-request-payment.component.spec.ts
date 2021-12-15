import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogRequestPaymentComponent } from './dialog-request-payment.component';

describe('DialogRequestPaymentComponent', () => {
  let component: DialogRequestPaymentComponent;
  let fixture: ComponentFixture<DialogRequestPaymentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRequestPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRequestPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
