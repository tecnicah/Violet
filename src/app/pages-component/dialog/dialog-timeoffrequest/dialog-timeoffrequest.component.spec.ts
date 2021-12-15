import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogTimeoffrequestComponent } from './dialog-timeoffrequest.component';

describe('DialogTimeoffrequestComponent', () => {
  let component: DialogTimeoffrequestComponent;
  let fixture: ComponentFixture<DialogTimeoffrequestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTimeoffrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTimeoffrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
