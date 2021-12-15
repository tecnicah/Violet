import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAddVahicleConsultantComponent } from './dialog-add-vahicle-consultant.component';

describe('DialogAddVahicleConsultantComponent', () => {
  let component: DialogAddVahicleConsultantComponent;
  let fixture: ComponentFixture<DialogAddVahicleConsultantComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddVahicleConsultantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddVahicleConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
