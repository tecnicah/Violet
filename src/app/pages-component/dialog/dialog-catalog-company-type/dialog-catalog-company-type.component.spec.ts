import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogCompanyTypeComponent } from './dialog-catalog-company-type.component';

describe('DialogCatalogCompanyTypeComponent', () => {
  let component: DialogCatalogCompanyTypeComponent;
  let fixture: ComponentFixture<DialogCatalogCompanyTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogCompanyTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogCompanyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
