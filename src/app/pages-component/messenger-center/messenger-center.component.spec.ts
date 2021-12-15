import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MessengerCenterComponent } from './messenger-center.component';

describe('MessengerCenterComponent', () => {
  let component: MessengerCenterComponent;
  let fixture: ComponentFixture<MessengerCenterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MessengerCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
