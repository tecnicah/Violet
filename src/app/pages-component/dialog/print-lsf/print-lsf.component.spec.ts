import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintLsfComponent } from './print-lsf.component';

describe('PrintLsfComponent', () => {
  let component: PrintLsfComponent;
  let fixture: ComponentFixture<PrintLsfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintLsfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintLsfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
