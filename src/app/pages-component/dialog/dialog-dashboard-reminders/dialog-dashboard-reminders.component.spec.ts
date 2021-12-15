import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogDashboardRemindersComponent } from './dialog-dashboard-reminders.component';

describe('DialogDashboardRemindersComponent', () => {
  let component: DialogDashboardRemindersComponent;
  let fixture: ComponentFixture<DialogDashboardRemindersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDashboardRemindersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDashboardRemindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
