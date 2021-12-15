import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CatalogsCompanyTypeComponent } from './catalogs-company-type.component';

describe('CatalogsCompanyTypeComponent', () => {
  let component: CatalogsCompanyTypeComponent;
  let fixture: ComponentFixture<CatalogsCompanyTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsCompanyTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogsCompanyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
