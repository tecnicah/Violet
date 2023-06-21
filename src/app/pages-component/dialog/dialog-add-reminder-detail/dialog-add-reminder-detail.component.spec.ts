import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddReminderDetailComponent } from './dialog-add-reminder-detail.component';

describe('DialogAddReminderDetailComponent', () => {
  let component: DialogAddReminderDetailComponent;
  let fixture: ComponentFixture<DialogAddReminderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddReminderDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddReminderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
