import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrMoveinDetailComponent } from './ir-movein-detail.component';

describe('IrMoveinDetailComponent', () => {
  let component: IrMoveinDetailComponent;
  let fixture: ComponentFixture<IrMoveinDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IrMoveinDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IrMoveinDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
