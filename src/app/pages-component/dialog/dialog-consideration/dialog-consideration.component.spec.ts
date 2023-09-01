import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConsiderationComponent } from './dialog-consideration.component';

describe('DialogConsiderationComponent', () => {
  let component: DialogConsiderationComponent;
  let fixture: ComponentFixture<DialogConsiderationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConsiderationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConsiderationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
