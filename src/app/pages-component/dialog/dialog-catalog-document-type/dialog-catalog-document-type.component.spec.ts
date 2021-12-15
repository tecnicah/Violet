import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogDocumentTypeComponent } from './dialog-catalog-document-type.component';

describe('DialogCatalogDocumentTypeComponent', () => {
  let component: DialogCatalogDocumentTypeComponent;
  let fixture: ComponentFixture<DialogCatalogDocumentTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogDocumentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogDocumentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
