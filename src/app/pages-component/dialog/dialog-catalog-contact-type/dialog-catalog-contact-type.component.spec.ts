import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogContactTypeComponent } from './dialog-catalog-contact-type.component';

describe('DialogCatalogContactTypeComponent', () => {
  let component: DialogCatalogContactTypeComponent;
  let fixture: ComponentFixture<DialogCatalogContactTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogContactTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogContactTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
