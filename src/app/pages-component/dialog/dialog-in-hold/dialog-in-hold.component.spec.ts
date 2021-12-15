import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInHoldComponent } from './dialog-in-hold.component';

describe('DialogInHoldComponent', () => {
  let component: DialogInHoldComponent;
  let fixture: ComponentFixture<DialogInHoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogInHoldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInHoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
