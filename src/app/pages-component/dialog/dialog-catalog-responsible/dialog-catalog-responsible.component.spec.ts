import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCatalogResponsibleComponent } from './dialog-catalog-responsible.component';

describe('DialogCatalogResponsibleComponent', () => {
  let component: DialogCatalogResponsibleComponent;
  let fixture: ComponentFixture<DialogCatalogResponsibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCatalogResponsibleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogResponsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
