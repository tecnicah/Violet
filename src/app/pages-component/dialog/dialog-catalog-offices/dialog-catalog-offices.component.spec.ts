import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogOfficesComponent } from './dialog-catalog-offices.component';

describe('DialogCatalogOfficesComponent', () => {
  let component: DialogCatalogOfficesComponent;
  let fixture: ComponentFixture<DialogCatalogOfficesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogOfficesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
