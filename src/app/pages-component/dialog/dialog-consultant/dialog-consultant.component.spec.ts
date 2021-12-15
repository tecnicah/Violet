import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogConsultantComponent } from './dialog-consultant.component';

describe('DialogConsultantComponent', () => {
  let component: DialogConsultantComponent;
  let fixture: ComponentFixture<DialogConsultantComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConsultantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
