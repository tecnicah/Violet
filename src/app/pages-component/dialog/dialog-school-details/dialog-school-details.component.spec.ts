import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogSchoolDetailsComponent } from './dialog-school-details.component';

describe('DialogSchoolDetailsComponent', () => {
  let component: DialogSchoolDetailsComponent;
  let fixture: ComponentFixture<DialogSchoolDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSchoolDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSchoolDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
