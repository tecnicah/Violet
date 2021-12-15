import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogNewChatComponent } from './dialog-new-chat.component';

describe('DialogNewChatComponent', () => {
  let component: DialogNewChatComponent;
  let fixture: ComponentFixture<DialogNewChatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogNewChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
