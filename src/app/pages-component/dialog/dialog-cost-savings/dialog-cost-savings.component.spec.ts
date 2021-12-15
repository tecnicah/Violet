import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCostSavingsComponent } from './dialog-cost-savings.component';

describe('DialogCostSavingsComponent', () => {
  let component: DialogCostSavingsComponent;
  let fixture: ComponentFixture<DialogCostSavingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCostSavingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCostSavingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
