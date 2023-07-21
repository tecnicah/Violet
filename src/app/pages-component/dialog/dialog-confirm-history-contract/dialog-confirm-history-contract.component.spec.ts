import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmHistoryContractComponent } from './dialog-confirm-history-contract.component';

describe('DialogConfirmHistoryContractComponent', () => {
  let component: DialogConfirmHistoryContractComponent;
  let fixture: ComponentFixture<DialogConfirmHistoryContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfirmHistoryContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmHistoryContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
