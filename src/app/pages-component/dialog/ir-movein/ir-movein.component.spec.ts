import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrMoveinComponent } from './ir-movein.component';

describe('IrMoveinComponent', () => {
  let component: IrMoveinComponent;
  let fixture: ComponentFixture<IrMoveinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrMoveinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IrMoveinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
