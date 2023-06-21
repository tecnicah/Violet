import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsfCostComponent } from './lsf-cost.component';

describe('LsfCostComponent', () => {
  let component: LsfCostComponent;
  let fixture: ComponentFixture<LsfCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LsfCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LsfCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
