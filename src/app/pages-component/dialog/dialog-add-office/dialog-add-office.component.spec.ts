import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAddOfficeComponent } from './dialog-add-office.component';

describe('DialogAddOfficeComponent', () => {
  let component: DialogAddOfficeComponent;
  let fixture: ComponentFixture<DialogAddOfficeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
