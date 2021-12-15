import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CatalogsLifeCiclesComponent } from './catalogs-life-cicles.component';

describe('CatalogsLifeCiclesComponent', () => {
  let component: CatalogsLifeCiclesComponent;
  let fixture: ComponentFixture<CatalogsLifeCiclesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsLifeCiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogsLifeCiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
