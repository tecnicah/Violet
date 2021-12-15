import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogEditColumsOperationalReportsComponent } from './dialog-edit-colums-operational-reports.component';

describe('DialogEditColumsOperationalReportsComponent', () => {
  let component: DialogEditColumsOperationalReportsComponent;
  let fixture: ComponentFixture<DialogEditColumsOperationalReportsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditColumsOperationalReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditColumsOperationalReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
