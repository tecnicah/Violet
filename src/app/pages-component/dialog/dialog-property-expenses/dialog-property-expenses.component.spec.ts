import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogPropertyExpensesComponent } from './dialog-property-expenses.component';

describe('DialogPropertyExpensesComponent', () => {
  let component: DialogPropertyExpensesComponent;
  let fixture: ComponentFixture<DialogPropertyExpensesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPropertyExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPropertyExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
