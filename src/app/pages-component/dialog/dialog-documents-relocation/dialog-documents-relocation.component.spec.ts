import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDocumentsRelocationComponent } from './dialog-documents-relocation.component';

describe('DialogDocumentsRelocationComponent', () => {
  let component: DialogDocumentsRelocationComponent;
  let fixture: ComponentFixture<DialogDocumentsRelocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDocumentsRelocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDocumentsRelocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
