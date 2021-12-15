import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogLeaseSummaryComponent } from './dialog-lease-summary.component';

describe('DialogLeaseSummaryComponent', () => {
  let component: DialogLeaseSummaryComponent;
  let fixture: ComponentFixture<DialogLeaseSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogLeaseSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLeaseSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
