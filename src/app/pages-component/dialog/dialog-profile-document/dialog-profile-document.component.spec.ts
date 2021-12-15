import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogProfileDocumentComponent } from './dialog-profile-document.component';

describe('DialogProfileDocumentComponent', () => {
  let component: DialogProfileDocumentComponent;
  let fixture: ComponentFixture<DialogProfileDocumentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogProfileDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProfileDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
