import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAdminCenterEmergencyComponent } from './dialog-admin-center-emergency.component';

describe('DialogAdminCenterEmergencyComponent', () => {
  let component: DialogAdminCenterEmergencyComponent;
  let fixture: ComponentFixture<DialogAdminCenterEmergencyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAdminCenterEmergencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAdminCenterEmergencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
