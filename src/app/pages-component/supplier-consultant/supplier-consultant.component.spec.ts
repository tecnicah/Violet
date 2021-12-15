import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SupplierConsultantComponent } from './supplier-consultant.component';

describe('SupplierConsultantComponent', () => {
  let component: SupplierConsultantComponent;
  let fixture: ComponentFixture<SupplierConsultantComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierConsultantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
