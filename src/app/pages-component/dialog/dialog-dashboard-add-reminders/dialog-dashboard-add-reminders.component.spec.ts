import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogDashboardAddRemindersComponent } from './dialog-dashboard-add-reminders.component';

describe('DialogDashboardAddRemindersComponent', () => {
  let component: DialogDashboardAddRemindersComponent;
  let fixture: ComponentFixture<DialogDashboardAddRemindersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDashboardAddRemindersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDashboardAddRemindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
