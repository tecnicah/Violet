import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogDocumentProfileSupplierComponent } from './dialog-document-profile-supplier.component';

describe('DialogDocumentProfileSupplierComponent', () => {
  let component: DialogDocumentProfileSupplierComponent;
  let fixture: ComponentFixture<DialogDocumentProfileSupplierComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDocumentProfileSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDocumentProfileSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
