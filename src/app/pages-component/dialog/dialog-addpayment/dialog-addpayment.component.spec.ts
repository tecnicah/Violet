import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAddpaymentComponent } from './dialog-addpayment.component';

describe('DialogAddpaymentComponent', () => {
  let component: DialogAddpaymentComponent;
  let fixture: ComponentFixture<DialogAddpaymentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddpaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
