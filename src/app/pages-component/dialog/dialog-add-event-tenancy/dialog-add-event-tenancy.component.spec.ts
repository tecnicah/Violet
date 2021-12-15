import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAddEventTenancyComponent } from './dialog-add-event-tenancy.component';

describe('DialogAddEventTenancyComponent', () => {
  let component: DialogAddEventTenancyComponent;
  let fixture: ComponentFixture<DialogAddEventTenancyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddEventTenancyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddEventTenancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
