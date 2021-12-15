import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogDocumentManagementComponent } from './dialog-document-management.component';

describe('DialogDocumentManagementComponent', () => {
  let component: DialogDocumentManagementComponent;
  let fixture: ComponentFixture<DialogDocumentManagementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDocumentManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDocumentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
