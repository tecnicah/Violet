import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogHistoryStatusComponent } from './dialog-history-status.component';

describe('DialogHistoryStatusComponent', () => {
  let component: DialogHistoryStatusComponent;
  let fixture: ComponentFixture<DialogHistoryStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogHistoryStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHistoryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
