import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAddVisitComponent } from './dialog-add-visit.component';

describe('DialogAddVisitComponent', () => {
  let component: DialogAddVisitComponent;
  let fixture: ComponentFixture<DialogAddVisitComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
