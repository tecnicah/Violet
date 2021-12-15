import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogPostItComponent } from './dialog-post-it.component';

describe('DialogPostItComponent', () => {
  let component: DialogPostItComponent;
  let fixture: ComponentFixture<DialogPostItComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPostItComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPostItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
