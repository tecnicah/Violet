import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCatalogDesiredPropertyTypeComponent } from './dialog-catalog-desired-property-type.component';

describe('DialogCatalogDesiredPropertyTypeComponent', () => {
  let component: DialogCatalogDesiredPropertyTypeComponent;
  let fixture: ComponentFixture<DialogCatalogDesiredPropertyTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCatalogDesiredPropertyTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogDesiredPropertyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
