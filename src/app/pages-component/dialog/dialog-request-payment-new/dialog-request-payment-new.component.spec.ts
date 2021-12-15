import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogRequestPaymentNewComponent } from './dialog-request-payment-new.component';

describe('DialogRequestPaymentNewComponent', () => {
  let component: DialogRequestPaymentNewComponent;
  let fixture: ComponentFixture<DialogRequestPaymentNewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRequestPaymentNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRequestPaymentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
