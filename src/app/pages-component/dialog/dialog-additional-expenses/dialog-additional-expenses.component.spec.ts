import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAdditionalExpensesComponent } from './dialog-additional-expenses.component';

describe('DialogAdditionalExpensesComponent', () => {
  let component: DialogAdditionalExpensesComponent;
  let fixture: ComponentFixture<DialogAdditionalExpensesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAdditionalExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAdditionalExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
