import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CatalogsSexComponent } from './catalogs-sex.component';

describe('CatalogsSexComponent', () => {
  let component: CatalogsSexComponent;
  let fixture: ComponentFixture<CatalogsSexComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsSexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogsSexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
