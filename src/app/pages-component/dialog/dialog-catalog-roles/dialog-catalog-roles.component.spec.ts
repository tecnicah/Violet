import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogRolesComponent } from './dialog-catalog-roles.component';

describe('DialogCatalogRolesComponent', () => {
  let component: DialogCatalogRolesComponent;
  let fixture: ComponentFixture<DialogCatalogRolesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
