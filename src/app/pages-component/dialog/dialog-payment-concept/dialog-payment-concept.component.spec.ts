import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogPaymentConceptComponent } from './dialog-payment-concept.component';

describe('DialogPaymentConceptComponent', () => {
  let component: DialogPaymentConceptComponent;
  let fixture: ComponentFixture<DialogPaymentConceptComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPaymentConceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPaymentConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
