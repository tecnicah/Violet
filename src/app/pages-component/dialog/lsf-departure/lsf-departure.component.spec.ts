import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsfDepartureComponent } from './lsf-departure.component';

describe('LsfDepartureComponent', () => {
  let component: LsfDepartureComponent;
  let fixture: ComponentFixture<LsfDepartureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LsfDepartureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LsfDepartureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
