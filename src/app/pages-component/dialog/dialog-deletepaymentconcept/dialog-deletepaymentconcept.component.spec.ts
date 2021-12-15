import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogDeletepaymentconceptComponent } from './dialog-deletepaymentconcept.component';

describe('DialogDeletepaymentconceptComponent', () => {
  let component: DialogDeletepaymentconceptComponent;
  let fixture: ComponentFixture<DialogDeletepaymentconceptComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDeletepaymentconceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeletepaymentconceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
