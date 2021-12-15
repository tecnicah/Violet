import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PreDecisionOrientationComponent } from './pre-decision-orientation.component';

describe('PreDecisionOrientationComponent', () => {
  let component: PreDecisionOrientationComponent;
  let fixture: ComponentFixture<PreDecisionOrientationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PreDecisionOrientationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreDecisionOrientationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
