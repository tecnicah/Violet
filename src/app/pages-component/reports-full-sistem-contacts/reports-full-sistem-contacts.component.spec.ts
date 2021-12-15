import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportsFullSistemContactsComponent } from './reports-full-sistem-contacts.component';

describe('ReportsFullSistemContactsComponent', () => {
  let component: ReportsFullSistemContactsComponent;
  let fixture: ComponentFixture<ReportsFullSistemContactsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsFullSistemContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsFullSistemContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
