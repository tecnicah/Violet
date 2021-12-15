import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAddAssignedTeamComponent } from './dialog-add-assigned-team.component';

describe('DialogAddAssignedTeamComponent', () => {
  let component: DialogAddAssignedTeamComponent;
  let fixture: ComponentFixture<DialogAddAssignedTeamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddAssignedTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddAssignedTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
