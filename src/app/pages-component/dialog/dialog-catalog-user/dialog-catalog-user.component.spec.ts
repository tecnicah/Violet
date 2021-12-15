import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogUserComponent } from './dialog-catalog-user.component';

describe('DialogCatalogUserComponent', () => {
  let component: DialogCatalogUserComponent;
  let fixture: ComponentFixture<DialogCatalogUserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
