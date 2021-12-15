import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAdminCenterAddInfoComponent } from './dialog-admin-center-add-info.component';

describe('DialogAdminCenterAddInfoComponent', () => {
  let component: DialogAdminCenterAddInfoComponent;
  let fixture: ComponentFixture<DialogAdminCenterAddInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAdminCenterAddInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAdminCenterAddInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
