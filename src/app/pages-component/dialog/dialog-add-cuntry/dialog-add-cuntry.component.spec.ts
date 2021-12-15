import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAddCuntryComponent } from './dialog-add-cuntry.component';

describe('DialogAddCuntryComponent', () => {
  let component: DialogAddCuntryComponent;
  let fixture: ComponentFixture<DialogAddCuntryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddCuntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddCuntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
