import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CatalogsWeightMeasureComponent } from './catalogs-weight-measure.component';

describe('CatalogsWeightMeasureComponent', () => {
  let component: CatalogsWeightMeasureComponent;
  let fixture: ComponentFixture<CatalogsWeightMeasureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsWeightMeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogsWeightMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
