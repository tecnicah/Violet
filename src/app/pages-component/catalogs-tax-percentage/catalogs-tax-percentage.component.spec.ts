import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CatalogsTaxPercentageComponent } from './catalogs-tax-percentage.component';

describe('CatalogsTaxPercentageComponent', () => {
  let component: CatalogsTaxPercentageComponent;
  let fixture: ComponentFixture<CatalogsTaxPercentageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsTaxPercentageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogsTaxPercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
