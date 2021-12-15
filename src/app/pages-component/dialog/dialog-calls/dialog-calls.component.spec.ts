import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCallsComponent } from './dialog-calls.component';

describe('DialogCallsComponent', () => {
  let component: DialogCallsComponent;
  let fixture: ComponentFixture<DialogCallsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
