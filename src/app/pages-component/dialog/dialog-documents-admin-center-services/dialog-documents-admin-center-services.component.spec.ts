import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDocumentsAdminCenterServicesComponent } from './dialog-documents-admin-center-services.component';

describe('DialogDocumentsAdminCenterServicesComponent', () => {
  let component: DialogDocumentsAdminCenterServicesComponent;
  let fixture: ComponentFixture<DialogDocumentsAdminCenterServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDocumentsAdminCenterServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDocumentsAdminCenterServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
