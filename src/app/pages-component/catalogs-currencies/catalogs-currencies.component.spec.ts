import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CatalogsCurrenciesComponent } from './catalogs-currencies.component';

describe('CatalogsCurrenciesComponent', () => {
  let component: CatalogsCurrenciesComponent;
  let fixture: ComponentFixture<CatalogsCurrenciesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsCurrenciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogsCurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
