import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmServiceComponent } from './dialog-confirm-service.component';

describe('DialogConfirmServiceComponent', () => {
  let component: DialogConfirmServiceComponent;
  let fixture: ComponentFixture<DialogConfirmServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfirmServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
