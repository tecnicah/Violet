import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CatalogsPremierOfficesComponent } from './catalogs-premier-offices.component';

describe('CatalogsPremierOfficesComponent', () => {
  let component: CatalogsPremierOfficesComponent;
  let fixture: ComponentFixture<CatalogsPremierOfficesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsPremierOfficesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogsPremierOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
