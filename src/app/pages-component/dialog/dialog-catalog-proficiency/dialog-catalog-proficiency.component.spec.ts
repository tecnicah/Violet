import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogProficiencyComponent } from './dialog-catalog-proficiency.component';

describe('DialogCatalogProficiencyComponent', () => {
  let component: DialogCatalogProficiencyComponent;
  let fixture: ComponentFixture<DialogCatalogProficiencyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogProficiencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogProficiencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
