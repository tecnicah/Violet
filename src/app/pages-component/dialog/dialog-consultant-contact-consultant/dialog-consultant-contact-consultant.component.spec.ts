import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogConsultantContactConsultantComponent } from './dialog-consultant-contact-consultant.component';

describe('DialogConsultantContactConsultantComponent', () => {
  let component: DialogConsultantContactConsultantComponent;
  let fixture: ComponentFixture<DialogConsultantContactConsultantComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConsultantContactConsultantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConsultantContactConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
