import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogEducationLevelComponent } from './dialog-catalog-education-level.component';

describe('DialogCatalogEducationLevelComponent', () => {
  let component: DialogCatalogEducationLevelComponent;
  let fixture: ComponentFixture<DialogCatalogEducationLevelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogEducationLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogEducationLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
