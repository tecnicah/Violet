import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CatalogsVehicleTypeComponent } from './catalogs-vehicle-type.component';

describe('CatalogsVehicleTypeComponent', () => {
  let component: CatalogsVehicleTypeComponent;
  let fixture: ComponentFixture<CatalogsVehicleTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsVehicleTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogsVehicleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
