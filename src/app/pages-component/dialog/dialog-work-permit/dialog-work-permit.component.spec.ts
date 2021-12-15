import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogWorkPermitComponent } from './dialog-work-permit.component';

describe('DialogWorkPermitComponent', () => {
  let component: DialogWorkPermitComponent;
  let fixture: ComponentFixture<DialogWorkPermitComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogWorkPermitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogWorkPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
