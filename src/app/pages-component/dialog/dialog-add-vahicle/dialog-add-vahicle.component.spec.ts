import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAddVahicleComponent } from './dialog-add-vahicle.component';

describe('DialogAddVahicleComponent', () => {
  let component: DialogAddVahicleComponent;
  let fixture: ComponentFixture<DialogAddVahicleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddVahicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddVahicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
