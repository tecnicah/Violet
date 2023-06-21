import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsfSelectComponent } from './lsf-select.component';

describe('LsfSelectComponent', () => {
  let component: LsfSelectComponent;
  let fixture: ComponentFixture<LsfSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LsfSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LsfSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
