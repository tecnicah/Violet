import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogHomeDetailsComponent } from './dialog-home-details.component';

describe('DialogHomeDetailsComponent', () => {
  let component: DialogHomeDetailsComponent;
  let fixture: ComponentFixture<DialogHomeDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogHomeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHomeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
