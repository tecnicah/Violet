import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogVisaCategoryComponent } from './dialog-catalog-visa-category.component';

describe('DialogCatalogVisaCategoryComponent', () => {
  let component: DialogCatalogVisaCategoryComponent;
  let fixture: ComponentFixture<DialogCatalogVisaCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogVisaCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogVisaCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
