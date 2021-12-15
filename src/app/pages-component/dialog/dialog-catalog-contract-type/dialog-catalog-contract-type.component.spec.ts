import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCatalogContractTypeComponent } from './dialog-catalog-contract-type.component';

describe('DialogCatalogContractTypeComponent', () => {
  let component: DialogCatalogContractTypeComponent;
  let fixture: ComponentFixture<DialogCatalogContractTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCatalogContractTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogContractTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
