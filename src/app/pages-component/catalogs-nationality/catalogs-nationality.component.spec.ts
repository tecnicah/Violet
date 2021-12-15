import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CatalogsNationalityComponent } from './catalogs-nationality.component';

describe('CatalogsNationalityComponent', () => {
  let component: CatalogsNationalityComponent;
  let fixture: ComponentFixture<CatalogsNationalityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsNationalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogsNationalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
