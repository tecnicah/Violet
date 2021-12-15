import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogStickynoteComponent } from './dialog-stickynote.component';

describe('DialogStickynoteComponent', () => {
  let component: DialogStickynoteComponent;
  let fixture: ComponentFixture<DialogStickynoteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogStickynoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStickynoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
