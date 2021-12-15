import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SupplierPartnersComponent } from './supplier-partners.component';

describe('SupplierPartnersComponent', () => {
  let component: SupplierPartnersComponent;
  let fixture: ComponentFixture<SupplierPartnersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierPartnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
