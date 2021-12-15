import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SupplierServicesComponent } from './supplier-services.component';

describe('SupplierServicesComponent', () => {
  let component: SupplierServicesComponent;
  let fixture: ComponentFixture<SupplierServicesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
