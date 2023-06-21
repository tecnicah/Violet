import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsfLandlordComponent } from './lsf-landlord.component';

describe('LsfLandlordComponent', () => {
  let component: LsfLandlordComponent;
  let fixture: ComponentFixture<LsfLandlordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LsfLandlordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LsfLandlordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
