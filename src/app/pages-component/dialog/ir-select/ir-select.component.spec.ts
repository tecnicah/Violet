import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrSelectComponent } from './ir-select.component';

describe('IrSelectComponent', () => {
  let component: IrSelectComponent;
  let fixture: ComponentFixture<IrSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IrSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
