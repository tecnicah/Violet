import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogContactsComponent } from './dialog-contacts.component';

describe('DialogContactsComponent', () => {
  let component: DialogContactsComponent;
  let fixture: ComponentFixture<DialogContactsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
