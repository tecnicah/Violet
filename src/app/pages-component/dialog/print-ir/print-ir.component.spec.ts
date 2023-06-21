import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintIrComponent } from './print-ir.component';

describe('PrintIrComponent', () => {
  let component: PrintIrComponent;
  let fixture: ComponentFixture<PrintIrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintIrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintIrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
