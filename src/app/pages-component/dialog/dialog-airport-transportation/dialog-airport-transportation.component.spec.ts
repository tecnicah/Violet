import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAirportTransportationComponent } from './dialog-airport-transportation.component';

describe('DialogAirportTransportationComponent', () => {
  let component: DialogAirportTransportationComponent;
  let fixture: ComponentFixture<DialogAirportTransportationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAirportTransportationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAirportTransportationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
