import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogChangeStatusComponent } from './dialog-change-status.component';

describe('DialogChangeStatusComponent', () => {
  let component: DialogChangeStatusComponent;
  let fixture: ComponentFixture<DialogChangeStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogChangeStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogChangeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
