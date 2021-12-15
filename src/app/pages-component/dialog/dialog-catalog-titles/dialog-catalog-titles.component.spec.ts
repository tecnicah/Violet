import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogTitlesComponent } from './dialog-catalog-titles.component';

describe('DialogCatalogTitlesComponent', () => {
  let component: DialogCatalogTitlesComponent;
  let fixture: ComponentFixture<DialogCatalogTitlesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogTitlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogTitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
