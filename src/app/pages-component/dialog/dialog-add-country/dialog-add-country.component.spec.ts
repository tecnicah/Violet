import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAddCountryComponent } from './dialog-add-country.component';

describe('DialogAddCountryComponent', () => {
  let component: DialogAddCountryComponent;
  let fixture: ComponentFixture<DialogAddCountryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
