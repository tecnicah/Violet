import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddDocumentsDetailComponent } from './dialog-add-documents-detail.component';

describe('DialogAddDocumentsDetailComponent', () => {
  let component: DialogAddDocumentsDetailComponent;
  let fixture: ComponentFixture<DialogAddDocumentsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddDocumentsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddDocumentsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
