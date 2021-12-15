import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogPartnerStatusComponent } from './dialog-catalog-partner-status.component';

describe('DialogCatalogPartnerStatusComponent', () => {
  let component: DialogCatalogPartnerStatusComponent;
  let fixture: ComponentFixture<DialogCatalogPartnerStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogPartnerStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogPartnerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
