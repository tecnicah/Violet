import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogVisaDeregistrationComponent } from './dialog-visa-deregistration.component';

describe('DialogVisaDeregistrationComponent', () => {
  let component: DialogVisaDeregistrationComponent;
  let fixture: ComponentFixture<DialogVisaDeregistrationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogVisaDeregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVisaDeregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
