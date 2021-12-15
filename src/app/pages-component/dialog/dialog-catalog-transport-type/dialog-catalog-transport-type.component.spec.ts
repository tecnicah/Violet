import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogTransportTypeComponent } from './dialog-catalog-transport-type.component';

describe('DialogCatalogTransportTypeComponent', () => {
  let component: DialogCatalogTransportTypeComponent;
  let fixture: ComponentFixture<DialogCatalogTransportTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogTransportTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogTransportTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
