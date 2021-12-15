import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogPrivacyComponent } from './dialog-catalog-privacy.component';

describe('DialogCatalogPrivacyComponent', () => {
  let component: DialogCatalogPrivacyComponent;
  let fixture: ComponentFixture<DialogCatalogPrivacyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogPrivacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogPrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
