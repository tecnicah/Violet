import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAttendeesComponent } from './dialog-attendees.component';

describe('DialogAttendeesComponent', () => {
  let component: DialogAttendeesComponent;
  let fixture: ComponentFixture<DialogAttendeesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAttendeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAttendeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
