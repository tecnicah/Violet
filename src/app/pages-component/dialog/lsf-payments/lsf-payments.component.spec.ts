import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsfPaymentsComponent } from './lsf-payments.component';

describe('LsfPaymentsComponent', () => {
  let component: LsfPaymentsComponent;
  let fixture: ComponentFixture<LsfPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LsfPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LsfPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
