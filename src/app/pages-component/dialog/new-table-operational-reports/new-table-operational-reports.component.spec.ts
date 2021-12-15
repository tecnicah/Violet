import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewTableOperationalReportsComponent } from './new-table-operational-reports.component';

describe('NewTableOperationalReportsComponent', () => {
  let component: NewTableOperationalReportsComponent;
  let fixture: ComponentFixture<NewTableOperationalReportsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTableOperationalReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTableOperationalReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
