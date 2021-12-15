import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogInactiveUserComponent } from './dialog-inactive-user.component';

describe('DialogInactiveUserComponent', () => {
  let component: DialogInactiveUserComponent;
  let fixture: ComponentFixture<DialogInactiveUserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogInactiveUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInactiveUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
