import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsfSpecialcComponent } from './lsf-specialc.component';

describe('LsfSpecialcComponent', () => {
  let component: LsfSpecialcComponent;
  let fixture: ComponentFixture<LsfSpecialcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LsfSpecialcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LsfSpecialcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
