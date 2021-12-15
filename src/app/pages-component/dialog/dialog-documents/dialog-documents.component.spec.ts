import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogDocumentsComponent } from './dialog-documents.component';

describe('DialogDocumentsComponent', () => {
  let component: DialogDocumentsComponent;
  let fixture: ComponentFixture<DialogDocumentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
