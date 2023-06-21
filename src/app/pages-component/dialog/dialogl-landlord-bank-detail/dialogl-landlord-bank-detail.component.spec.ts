import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoglLandlordBankDetailComponent } from './dialogl-landlord-bank-detail.component';

describe('DialoglLandlordBankDetailComponent', () => {
  let component: DialoglLandlordBankDetailComponent;
  let fixture: ComponentFixture<DialoglLandlordBankDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialoglLandlordBankDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoglLandlordBankDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
