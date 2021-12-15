import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAddCountrySeccionCountryComponent } from './dialog-add-country-seccion-country.component';

describe('DialogAddCountrySeccionCountryComponent', () => {
  let component: DialogAddCountrySeccionCountryComponent;
  let fixture: ComponentFixture<DialogAddCountrySeccionCountryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddCountrySeccionCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddCountrySeccionCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
