import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogRequestedInvoiceComponent } from './dialog-requested-invoice.component';

describe('DialogRequestedInvoiceComponent', () => {
  let component: DialogRequestedInvoiceComponent;
  let fixture: ComponentFixture<DialogRequestedInvoiceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRequestedInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRequestedInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
