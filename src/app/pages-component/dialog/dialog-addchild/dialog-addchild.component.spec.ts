import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAddchildComponent } from './dialog-addchild.component';

describe('DialogAddchildComponent', () => {
  let component: DialogAddchildComponent;
  let fixture: ComponentFixture<DialogAddchildComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddchildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddchildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
