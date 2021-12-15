import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TrainingFinishedComponent } from './training-finished.component';

describe('TrainingFinishedComponent', () => {
  let component: TrainingFinishedComponent;
  let fixture: ComponentFixture<TrainingFinishedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingFinishedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
