import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousinglistComponent } from './housinglist.component';

describe('HousinglistComponent', () => {
  let component: HousinglistComponent;
  let fixture: ComponentFixture<HousinglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousinglistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HousinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
