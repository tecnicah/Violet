import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRemindersServiceDetailComponent } from './dialog-reminders-service-detail.component';

describe('DialogRemindersServiceDetailComponent', () => {
  let component: DialogRemindersServiceDetailComponent;
  let fixture: ComponentFixture<DialogRemindersServiceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRemindersServiceDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRemindersServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
