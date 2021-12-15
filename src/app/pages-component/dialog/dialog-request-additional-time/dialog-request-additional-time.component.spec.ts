import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogRequestAdditionalTimeComponent } from './dialog-request-additional-time.component';

describe('DialogRequestAdditionalTimeComponent', () => {
  let component: DialogRequestAdditionalTimeComponent;
  let fixture: ComponentFixture<DialogRequestAdditionalTimeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRequestAdditionalTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRequestAdditionalTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
