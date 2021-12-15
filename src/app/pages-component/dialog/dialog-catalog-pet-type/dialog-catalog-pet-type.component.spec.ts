import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogPetTypeComponent } from './dialog-catalog-pet-type.component';

describe('DialogCatalogPetTypeComponent', () => {
  let component: DialogCatalogPetTypeComponent;
  let fixture: ComponentFixture<DialogCatalogPetTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogPetTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogPetTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
