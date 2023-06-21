import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsfComponent } from './lsf.component';

describe('LsfComponent', () => {
  let component: LsfComponent;
  let fixture: ComponentFixture<LsfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LsfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LsfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
