import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAddServiceAdminCenterComponent } from './dialog-add-service-admin-center.component';

describe('DialogAddServiceAdminCenterComponent', () => {
  let component: DialogAddServiceAdminCenterComponent;
  let fixture: ComponentFixture<DialogAddServiceAdminCenterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddServiceAdminCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddServiceAdminCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
