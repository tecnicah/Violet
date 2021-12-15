import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogResidencyPermitComponent } from './dialog-residency-permit.component';

describe('DialogResidencyPermitComponent', () => {
  let component: DialogResidencyPermitComponent;
  let fixture: ComponentFixture<DialogResidencyPermitComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogResidencyPermitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogResidencyPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
