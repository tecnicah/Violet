import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarserviciosComponent } from './asignarservicios.component';

describe('AsignarserviciosComponent', () => {
  let component: AsignarserviciosComponent;
  let fixture: ComponentFixture<AsignarserviciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarserviciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarserviciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
