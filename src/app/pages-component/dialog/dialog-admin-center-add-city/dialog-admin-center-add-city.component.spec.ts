import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAdminCenterAddCityComponent } from './dialog-admin-center-add-city.component';

describe('DialogAdminCenterAddCityComponent', () => {
  let component: DialogAdminCenterAddCityComponent;
  let fixture: ComponentFixture<DialogAdminCenterAddCityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAdminCenterAddCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAdminCenterAddCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
