import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAddColumnsFullSistemContactComponent } from './dialog-add-columns-full-sistem-contact.component';

describe('DialogAddColumnsFullSistemContactComponent', () => {
  let component: DialogAddColumnsFullSistemContactComponent;
  let fixture: ComponentFixture<DialogAddColumnsFullSistemContactComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddColumnsFullSistemContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddColumnsFullSistemContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
