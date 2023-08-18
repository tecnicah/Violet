import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPaymentsMethodsComponent } from './dialog-payments-methods.component';

describe('DialogPaymentsMethodsComponent', () => {
  let component: DialogPaymentsMethodsComponent;
  let fixture: ComponentFixture<DialogPaymentsMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPaymentsMethodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPaymentsMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
