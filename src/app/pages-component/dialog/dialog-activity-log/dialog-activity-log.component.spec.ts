import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogActivityLogComponent } from './dialog-activity-log.component';

describe('DialogActivityLogComponent', () => {
  let component: DialogActivityLogComponent;
  let fixture: ComponentFixture<DialogActivityLogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogActivityLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogActivityLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
