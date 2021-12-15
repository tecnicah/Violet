import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogCliclesComponent } from './dialog-catalog-clicles.component';

describe('DialogCatalogCliclesComponent', () => {
  let component: DialogCatalogCliclesComponent;
  let fixture: ComponentFixture<DialogCatalogCliclesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogCliclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogCliclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
