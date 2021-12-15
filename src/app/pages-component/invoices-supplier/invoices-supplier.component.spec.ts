import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InvoicesSupplierComponent } from './invoices-supplier.component';

describe('InvoicesSupplierComponent', () => {
  let component: InvoicesSupplierComponent;
  let fixture: ComponentFixture<InvoicesSupplierComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicesSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicesSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
