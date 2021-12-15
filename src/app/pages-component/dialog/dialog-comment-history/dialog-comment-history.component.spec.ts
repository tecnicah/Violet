import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCommentHistoryComponent } from './dialog-comment-history.component';

describe('DialogCommentHistoryComponent', () => {
  let component: DialogCommentHistoryComponent;
  let fixture: ComponentFixture<DialogCommentHistoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCommentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCommentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
