import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CatalogsUsersComponent } from './catalogs-users.component';

describe('CatalogsUsersComponent', () => {
  let component: CatalogsUsersComponent;
  let fixture: ComponentFixture<CatalogsUsersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
