import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCampusComponent } from './dialog-campus.component';

describe('DialogCampusComponent', () => {
  let component: DialogCampusComponent;
  let fixture: ComponentFixture<DialogCampusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCampusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
