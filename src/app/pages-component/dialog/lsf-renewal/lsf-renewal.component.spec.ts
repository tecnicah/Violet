import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsfRenewalComponent } from './lsf-renewal.component';

describe('LsfRenewalComponent', () => {
  let component: LsfRenewalComponent;
  let fixture: ComponentFixture<LsfRenewalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LsfRenewalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LsfRenewalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
