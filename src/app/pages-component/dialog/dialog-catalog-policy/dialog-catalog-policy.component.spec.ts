import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogPolicyComponent } from './dialog-catalog-policy.component';

describe('DialogCatalogPolicyComponent', () => {
  let component: DialogCatalogPolicyComponent;
  let fixture: ComponentFixture<DialogCatalogPolicyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
