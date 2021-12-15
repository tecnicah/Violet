import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminCenterSystemConfigurationComponent } from './admin-center-system-configuration.component';

describe('AdminCenterSystemConfigurationComponent', () => {
  let component: AdminCenterSystemConfigurationComponent;
  let fixture: ComponentFixture<AdminCenterSystemConfigurationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCenterSystemConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCenterSystemConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
