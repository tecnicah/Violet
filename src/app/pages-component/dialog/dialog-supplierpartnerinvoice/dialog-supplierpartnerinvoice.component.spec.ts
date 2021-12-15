import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogSupplierpartnerinvoiceComponent } from './dialog-supplierpartnerinvoice.component';

describe('DialogSupplierpartnerinvoiceComponent', () => {
  let component: DialogSupplierpartnerinvoiceComponent;
  let fixture: ComponentFixture<DialogSupplierpartnerinvoiceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSupplierpartnerinvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSupplierpartnerinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
