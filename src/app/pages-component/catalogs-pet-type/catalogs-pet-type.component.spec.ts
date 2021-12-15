import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CatalogsPetTypeComponent } from './catalogs-pet-type.component';

describe('CatalogsPetTypeComponent', () => {
  let component: CatalogsPetTypeComponent;
  let fixture: ComponentFixture<CatalogsPetTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsPetTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogsPetTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
