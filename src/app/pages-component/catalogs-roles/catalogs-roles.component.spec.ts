import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CatalogsRolesComponent } from './catalogs-roles.component';

describe('CatalogsRolesComponent', () => {
  let component: CatalogsRolesComponent;
  let fixture: ComponentFixture<CatalogsRolesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogsRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
