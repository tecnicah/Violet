import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogEditFiltersOperationalReportsComponent } from './dialog-edit-filters-operational-reports.component';

describe('DialogEditFiltersOperationalReportsComponent', () => {
  let component: DialogEditFiltersOperationalReportsComponent;
  let fixture: ComponentFixture<DialogEditFiltersOperationalReportsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditFiltersOperationalReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditFiltersOperationalReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
