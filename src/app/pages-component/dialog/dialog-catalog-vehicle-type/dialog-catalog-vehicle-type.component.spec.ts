import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogVehicleTypeComponent } from './dialog-catalog-vehicle-type.component';

describe('DialogCatalogVehicleTypeComponent', () => {
  let component: DialogCatalogVehicleTypeComponent;
  let fixture: ComponentFixture<DialogCatalogVehicleTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogVehicleTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogVehicleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
