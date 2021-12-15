import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCatalogPricingScheduleComponent } from './dialog-catalog-pricing-schedule.component';

describe('DialogCatalogPricingScheduleComponent', () => {
  let component: DialogCatalogPricingScheduleComponent;
  let fixture: ComponentFixture<DialogCatalogPricingScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCatalogPricingScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogPricingScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
