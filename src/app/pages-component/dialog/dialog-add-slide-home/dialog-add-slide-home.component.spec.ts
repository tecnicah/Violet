import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAddSlideHomeComponent } from './dialog-add-slide-home.component';

describe('DialogAddSlideHomeComponent', () => {
  let component: DialogAddSlideHomeComponent;
  let fixture: ComponentFixture<DialogAddSlideHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddSlideHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddSlideHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
