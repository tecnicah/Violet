import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminCenterUsersComponent } from './admin-center-users.component';

describe('AdminCenterUsersComponent', () => {
  let component: AdminCenterUsersComponent;
  let fixture: ComponentFixture<AdminCenterUsersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCenterUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCenterUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
