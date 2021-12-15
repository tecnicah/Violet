import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogArrivalComponent } from './dialog-arrival.component';

describe('DialogArrivalComponent', () => {
  let component: DialogArrivalComponent;
  let fixture: ComponentFixture<DialogArrivalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogArrivalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogArrivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
