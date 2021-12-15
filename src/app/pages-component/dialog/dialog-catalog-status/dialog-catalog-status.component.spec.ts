import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogStatusComponent } from './dialog-catalog-status.component';

describe('DialogCatalogStatusComponent', () => {
  let component: DialogCatalogStatusComponent;
  let fixture: ComponentFixture<DialogCatalogStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
