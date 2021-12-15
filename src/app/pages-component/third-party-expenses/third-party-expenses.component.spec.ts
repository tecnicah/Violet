import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThirdPartyExpensesComponent } from './third-party-expenses.component';

describe('ThirdPartyExpensesComponent', () => {
  let component: ThirdPartyExpensesComponent;
  let fixture: ComponentFixture<ThirdPartyExpensesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdPartyExpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPartyExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
