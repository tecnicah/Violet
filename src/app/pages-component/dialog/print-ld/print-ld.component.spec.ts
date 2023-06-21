import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintLdComponent } from './print-ld.component';

describe('PrintLdComponent', () => {
  let component: PrintLdComponent;
  let fixture: ComponentFixture<PrintLdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintLdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintLdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
