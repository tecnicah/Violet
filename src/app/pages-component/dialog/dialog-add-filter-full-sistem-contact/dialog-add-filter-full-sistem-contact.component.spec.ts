import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAddFilterFullSistemContactComponent } from './dialog-add-filter-full-sistem-contact.component';

describe('DialogAddFilterFullSistemContactComponent', () => {
  let component: DialogAddFilterFullSistemContactComponent;
  let fixture: ComponentFixture<DialogAddFilterFullSistemContactComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddFilterFullSistemContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddFilterFullSistemContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
