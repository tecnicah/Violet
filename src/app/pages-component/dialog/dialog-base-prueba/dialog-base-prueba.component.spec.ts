import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogBasePruebaComponent } from './dialog-base-prueba.component';

describe('DialogBasePruebaComponent', () => {
  let component: DialogBasePruebaComponent;
  let fixture: ComponentFixture<DialogBasePruebaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBasePruebaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBasePruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
