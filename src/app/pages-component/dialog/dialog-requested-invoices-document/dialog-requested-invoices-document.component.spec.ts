import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogRequestedInvoicesDocumentComponent } from './dialog-requested-invoices-document.component';

describe('DialogRequestedInvoicesDocumentComponent', () => {
  let component: DialogRequestedInvoicesDocumentComponent;
  let fixture: ComponentFixture<DialogRequestedInvoicesDocumentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRequestedInvoicesDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRequestedInvoicesDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
