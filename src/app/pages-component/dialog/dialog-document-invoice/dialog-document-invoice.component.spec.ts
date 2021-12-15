import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogDocumentInvoiceComponent } from './dialog-document-invoice.component';

describe('DialogDocumentInvoiceComponent', () => {
  let component: DialogDocumentInvoiceComponent;
  let fixture: ComponentFixture<DialogDocumentInvoiceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDocumentInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDocumentInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
