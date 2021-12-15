import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogScoreAwadsComponent } from './dialog-score-awads.component';

describe('DialogScoreAwadsComponent', () => {
  let component: DialogScoreAwadsComponent;
  let fixture: ComponentFixture<DialogScoreAwadsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogScoreAwadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogScoreAwadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
