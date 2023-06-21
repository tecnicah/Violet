import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrMoveoutComponent } from './ir-moveout.component';

describe('IrMoveoutComponent', () => {
  let component: IrMoveoutComponent;
  let fixture: ComponentFixture<IrMoveoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrMoveoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IrMoveoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
