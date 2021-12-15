import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogEvaluateComponent } from './dialog-evaluate.component';

describe('DialogEvaluateComponent', () => {
  let component: DialogEvaluateComponent;
  let fixture: ComponentFixture<DialogEvaluateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEvaluateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEvaluateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
