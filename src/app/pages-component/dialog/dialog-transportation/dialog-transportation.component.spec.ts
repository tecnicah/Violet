import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogTransportationComponent } from './dialog-transportation.component';

describe('DialogTransportationComponent', () => {
  let component: DialogTransportationComponent;
  let fixture: ComponentFixture<DialogTransportationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTransportationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTransportationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
