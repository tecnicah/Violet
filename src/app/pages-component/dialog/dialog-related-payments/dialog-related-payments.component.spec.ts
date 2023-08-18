import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRelatedPaymentsComponent } from './dialog-related-payments.component';

describe('DialogRelatedPaymentsComponent', () => {
  let component: DialogRelatedPaymentsComponent;
  let fixture: ComponentFixture<DialogRelatedPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRelatedPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRelatedPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
