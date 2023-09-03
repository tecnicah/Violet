import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenRequestComponent } from './sen-request.component';

describe('SenRequestComponent', () => {
  let component: SenRequestComponent;
  let fixture: ComponentFixture<SenRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SenRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
