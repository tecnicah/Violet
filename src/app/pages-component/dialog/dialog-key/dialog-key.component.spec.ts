import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogKeyComponent } from './dialog-key.component';

describe('DialogKeyComponent', () => {
  let component: DialogKeyComponent;
  let fixture: ComponentFixture<DialogKeyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
