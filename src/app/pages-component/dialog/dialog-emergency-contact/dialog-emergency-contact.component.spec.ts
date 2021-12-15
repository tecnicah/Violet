import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogEmergencyContactComponent } from './dialog-emergency-contact.component';

describe('DialogEmergencyContactComponent', () => {
  let component: DialogEmergencyContactComponent;
  let fixture: ComponentFixture<DialogEmergencyContactComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEmergencyContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEmergencyContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
