import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAddTableFullSistemContactComponent } from './dialog-add-table-full-sistem-contact.component';

describe('DialogAddTableFullSistemContactComponent', () => {
  let component: DialogAddTableFullSistemContactComponent;
  let fixture: ComponentFixture<DialogAddTableFullSistemContactComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddTableFullSistemContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddTableFullSistemContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
