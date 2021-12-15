import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogDepartureComponent } from './dialog-departure.component';

describe('DialogDepartureComponent', () => {
  let component: DialogDepartureComponent;
  let fixture: ComponentFixture<DialogDepartureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDepartureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDepartureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
