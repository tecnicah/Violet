import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogRequestInvoiceComponent } from './dialog-request-invoice.component';

describe('DialogRequestInvoiceComponent', () => {
  let component: DialogRequestInvoiceComponent;
  let fixture: ComponentFixture<DialogRequestInvoiceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRequestInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRequestInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
