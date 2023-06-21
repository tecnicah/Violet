import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrInspectionDetailComponent } from './ir-inspection-detail.component';

describe('IrInspectionDetailComponent', () => {
  let component: IrInspectionDetailComponent;
  let fixture: ComponentFixture<IrInspectionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrInspectionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IrInspectionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
