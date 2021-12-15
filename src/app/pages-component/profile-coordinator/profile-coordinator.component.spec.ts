import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfileCoordinatorComponent } from './profile-coordinator.component';

describe('ProfileCoordinatorComponent', () => {
  let component: ProfileCoordinatorComponent;
  let fixture: ComponentFixture<ProfileCoordinatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCoordinatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
