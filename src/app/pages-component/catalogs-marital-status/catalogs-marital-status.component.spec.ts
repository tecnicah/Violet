import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CatalogsMaritalStatusComponent } from './catalogs-marital-status.component';

describe('CatalogsMaritalStatusComponent', () => {
  let component: CatalogsMaritalStatusComponent;
  let fixture: ComponentFixture<CatalogsMaritalStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsMaritalStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogsMaritalStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
