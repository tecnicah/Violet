import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogBreedComponent } from './dialog-catalog-breed.component';

describe('DialogCatalogBreedComponent', () => {
  let component: DialogCatalogBreedComponent;
  let fixture: ComponentFixture<DialogCatalogBreedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogBreedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogBreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
