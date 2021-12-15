import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAdministrativeContactConsultantComponent } from './dialog-administrative-contact-consultant.component';

describe('DialogAdministrativeContactConsultantComponent', () => {
  let component: DialogAdministrativeContactConsultantComponent;
  let fixture: ComponentFixture<DialogAdministrativeContactConsultantComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAdministrativeContactConsultantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAdministrativeContactConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
