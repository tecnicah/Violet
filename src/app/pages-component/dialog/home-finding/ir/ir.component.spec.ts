import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrComponent } from './ir.component';

describe('IrComponent', () => {
  let component: IrComponent;
  let fixture: ComponentFixture<IrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
