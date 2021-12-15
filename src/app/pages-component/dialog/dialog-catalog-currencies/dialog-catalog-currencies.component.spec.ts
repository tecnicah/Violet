import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogCurrenciesComponent } from './dialog-catalog-currencies.component';

describe('DialogCatalogCurrenciesComponent', () => {
  let component: DialogCatalogCurrenciesComponent;
  let fixture: ComponentFixture<DialogCatalogCurrenciesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogCurrenciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogCurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
