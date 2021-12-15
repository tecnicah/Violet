import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogSexComponent } from './dialog-catalog-sex.component';

describe('DialogCatalogSexComponent', () => {
  let component: DialogCatalogSexComponent;
  let fixture: ComponentFixture<DialogCatalogSexComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogSexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogSexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
