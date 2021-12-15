import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogRelationshipComponent } from './dialog-catalog-relationship.component';

describe('DialogCatalogRelationshipComponent', () => {
  let component: DialogCatalogRelationshipComponent;
  let fixture: ComponentFixture<DialogCatalogRelationshipComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogRelationshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
