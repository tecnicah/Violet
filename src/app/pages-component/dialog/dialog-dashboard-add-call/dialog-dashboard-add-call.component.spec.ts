import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogDashboardAddCallComponent } from './dialog-dashboard-add-call.component';

describe('DialogDashboardAddCallComponent', () => {
  let component: DialogDashboardAddCallComponent;
  let fixture: ComponentFixture<DialogDashboardAddCallComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDashboardAddCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDashboardAddCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
