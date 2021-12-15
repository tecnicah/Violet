import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogTaxPercentageComponent } from './dialog-catalog-tax-percentage.component';

describe('DialogCatalogTaxPercentageComponent', () => {
  let component: DialogCatalogTaxPercentageComponent;
  let fixture: ComponentFixture<DialogCatalogTaxPercentageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogTaxPercentageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogTaxPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
