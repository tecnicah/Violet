import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogCoverageTypeComponent } from './dialog-catalog-coverage-type.component';

describe('DialogCatalogCoverageTypeComponent', () => {
  let component: DialogCatalogCoverageTypeComponent;
  let fixture: ComponentFixture<DialogCatalogCoverageTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogCoverageTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogCoverageTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
