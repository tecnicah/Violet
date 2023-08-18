import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBankingDetailsComponent } from './modal-banking-details.component';

describe('ModalBankingDetailsComponent', () => {
  let component: ModalBankingDetailsComponent;
  let fixture: ComponentFixture<ModalBankingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBankingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBankingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
