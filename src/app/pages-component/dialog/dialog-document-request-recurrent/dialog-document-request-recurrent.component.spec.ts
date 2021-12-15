import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogDocumentRequestRecurrentComponent } from './dialog-document-request-recurrent.component';

describe('DialogDocumentRequestRecurrentComponent', () => {
  let component: DialogDocumentRequestRecurrentComponent;
  let fixture: ComponentFixture<DialogDocumentRequestRecurrentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDocumentRequestRecurrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDocumentRequestRecurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
