import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogExperiensTeamComponent } from './dialog-experiens-team.component';

describe('DialogExperiensTeamComponent', () => {
  let component: DialogExperiensTeamComponent;
  let fixture: ComponentFixture<DialogExperiensTeamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogExperiensTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExperiensTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
