import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrRepairDetailComponent } from './ir-repair-detail.component';

describe('IrRepairDetailComponent', () => {
  let component: IrRepairDetailComponent;
  let fixture: ComponentFixture<IrRepairDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrRepairDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IrRepairDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
