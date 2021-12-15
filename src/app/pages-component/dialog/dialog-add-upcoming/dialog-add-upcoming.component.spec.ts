import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAddUpcomingComponent } from './dialog-add-upcoming.component';

describe('DialogAddUpcomingComponent', () => {
  let component: DialogAddUpcomingComponent;
  let fixture: ComponentFixture<DialogAddUpcomingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddUpcomingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
