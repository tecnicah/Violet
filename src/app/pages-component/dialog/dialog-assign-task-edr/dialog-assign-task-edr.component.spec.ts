import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAssignTaskEDRComponent } from './dialog-assign-task-edr.component';

describe('DialogAssignTaskEDRComponent', () => {
  let component: DialogAssignTaskEDRComponent;
  let fixture: ComponentFixture<DialogAssignTaskEDRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAssignTaskEDRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAssignTaskEDRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
