import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogDocumentsLeadClientComponent } from './dialog-documents-lead-client.component';

describe('DialogDocumentsLeadClientComponent', () => {
  let component: DialogDocumentsLeadClientComponent;
  let fixture: ComponentFixture<DialogDocumentsLeadClientComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDocumentsLeadClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDocumentsLeadClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
