import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogPaymentConceptDocumentComponent } from './dialog-payment-concept-document.component';

describe('DialogPaymentConceptDocumentComponent', () => {
  let component: DialogPaymentConceptDocumentComponent;
  let fixture: ComponentFixture<DialogPaymentConceptDocumentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPaymentConceptDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPaymentConceptDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
