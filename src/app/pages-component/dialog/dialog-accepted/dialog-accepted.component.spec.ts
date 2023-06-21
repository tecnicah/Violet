import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAcceptedComponent } from './dialog-accepted.component';

describe('DialogAcceptedComponent', () => {
  let component: DialogAcceptedComponent;
  let fixture: ComponentFixture<DialogAcceptedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAcceptedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
