import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogServiceTypeComponent } from './dialog-catalog-service-type.component';

describe('DialogCatalogServiceTypeComponent', () => {
  let component: DialogCatalogServiceTypeComponent;
  let fixture: ComponentFixture<DialogCatalogServiceTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogServiceTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogServiceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
