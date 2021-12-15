import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAddOperationLeaderComponent } from './dialog-add-operation-leader.component';

describe('DialogAddOperationLeaderComponent', () => {
  let component: DialogAddOperationLeaderComponent;
  let fixture: ComponentFixture<DialogAddOperationLeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddOperationLeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddOperationLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
