import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CatalogsEducationLevelComponent } from './catalogs-education-level.component';

describe('CatalogsEducationLevelComponent', () => {
  let component: CatalogsEducationLevelComponent;
  let fixture: ComponentFixture<CatalogsEducationLevelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsEducationLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogsEducationLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
