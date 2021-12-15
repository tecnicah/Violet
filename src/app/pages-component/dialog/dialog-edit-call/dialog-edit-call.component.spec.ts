import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogEditCallComponent } from './dialog-edit-call.component';

describe('DialogEditCallComponent', () => {
  let component: DialogEditCallComponent;
  let fixture: ComponentFixture<DialogEditCallComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
