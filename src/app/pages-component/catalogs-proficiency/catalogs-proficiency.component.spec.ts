import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CatalogsProficiencyComponent } from './catalogs-proficiency.component';

describe('CatalogsProficiencyComponent', () => {
  let component: CatalogsProficiencyComponent;
  let fixture: ComponentFixture<CatalogsProficiencyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsProficiencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogsProficiencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
