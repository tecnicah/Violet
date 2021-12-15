import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CatalogsJobTitlesComponent } from './catalogs-job-titles.component';

describe('CatalogsJobTitlesComponent', () => {
  let component: CatalogsJobTitlesComponent;
  let fixture: ComponentFixture<CatalogsJobTitlesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsJobTitlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogsJobTitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
