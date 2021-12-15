import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogSupplierTypeComponent } from './dialog-catalog-supplier-type.component';

describe('DialogCatalogSupplierTypeComponent', () => {
  let component: DialogCatalogSupplierTypeComponent;
  let fixture: ComponentFixture<DialogCatalogSupplierTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogSupplierTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogSupplierTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
