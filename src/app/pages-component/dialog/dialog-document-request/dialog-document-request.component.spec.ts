import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogDocumentRequestComponent } from './dialog-document-request.component';

describe('DialogDocumentRequestComponent', () => {
  let component: DialogDocumentRequestComponent;
  let fixture: ComponentFixture<DialogDocumentRequestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDocumentRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDocumentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
