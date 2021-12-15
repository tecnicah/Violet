import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAdminCenterDocumentsUploadComponent } from './dialog-admin-center-documents-upload.component';

describe('DialogAdminCenterDocumentsUploadComponent', () => {
  let component: DialogAdminCenterDocumentsUploadComponent;
  let fixture: ComponentFixture<DialogAdminCenterDocumentsUploadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAdminCenterDocumentsUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAdminCenterDocumentsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
