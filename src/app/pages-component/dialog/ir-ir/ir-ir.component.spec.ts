import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrIrComponent } from './ir-ir.component';

describe('IrIrComponent', () => {
  let component: IrIrComponent;
  let fixture: ComponentFixture<IrIrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrIrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IrIrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
