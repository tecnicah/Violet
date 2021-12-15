import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCatalogEmergecyContactComponent } from './dialog-catalog-emergecy-contact.component';

describe('DialogCatalogEmergecyContactComponent', () => {
  let component: DialogCatalogEmergecyContactComponent;
  let fixture: ComponentFixture<DialogCatalogEmergecyContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCatalogEmergecyContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogEmergecyContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
