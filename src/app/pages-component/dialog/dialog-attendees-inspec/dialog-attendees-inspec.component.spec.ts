import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAttendeesInspecComponent } from './dialog-attendees-inspec.component';

describe('DialogAttendeesInspecComponent', () => {
  let component: DialogAttendeesInspecComponent;
  let fixture: ComponentFixture<DialogAttendeesInspecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAttendeesInspecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAttendeesInspecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
