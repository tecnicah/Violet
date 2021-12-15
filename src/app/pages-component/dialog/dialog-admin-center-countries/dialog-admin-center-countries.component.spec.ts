import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAdminCenterCountriesComponent } from './dialog-admin-center-countries.component';

describe('DialogAdminCenterCountriesComponent', () => {
  let component: DialogAdminCenterCountriesComponent;
  let fixture: ComponentFixture<DialogAdminCenterCountriesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAdminCenterCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAdminCenterCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
