import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAddLeaderComponent } from './dialog-add-leader.component';

describe('DialogAddLeaderComponent', () => {
  let component: DialogAddLeaderComponent;
  let fixture: ComponentFixture<DialogAddLeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddLeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
