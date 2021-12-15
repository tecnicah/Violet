import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogCoordinatorTypeComponent } from './dialog-catalog-coordinator-type.component';

describe('DialogCatalogCoordinatorTypeComponent', () => {
  let component: DialogCatalogCoordinatorTypeComponent;
  let fixture: ComponentFixture<DialogCatalogCoordinatorTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogCoordinatorTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogCoordinatorTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
