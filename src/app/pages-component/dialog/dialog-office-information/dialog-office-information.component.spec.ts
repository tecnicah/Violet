import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogOfficeInformationComponent } from './dialog-office-information.component';

describe('DialogOfficeInformationComponent', () => {
  let component: DialogOfficeInformationComponent;
  let fixture: ComponentFixture<DialogOfficeInformationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogOfficeInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOfficeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
