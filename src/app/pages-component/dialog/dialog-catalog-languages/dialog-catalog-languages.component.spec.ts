import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogLanguagesComponent } from './dialog-catalog-languages.component';

describe('DialogCatalogLanguagesComponent', () => {
  let component: DialogCatalogLanguagesComponent;
  let fixture: ComponentFixture<DialogCatalogLanguagesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogLanguagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
