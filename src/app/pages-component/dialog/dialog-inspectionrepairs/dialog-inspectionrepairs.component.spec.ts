import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogInspectionrepairsComponent } from './dialog-inspectionrepairs.component';

describe('DialogInspectionrepairsComponent', () => {
  let component: DialogInspectionrepairsComponent;
  let fixture: ComponentFixture<DialogInspectionrepairsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogInspectionrepairsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInspectionrepairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
