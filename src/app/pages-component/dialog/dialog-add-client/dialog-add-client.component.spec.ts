import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAddClientComponent } from './dialog-add-client.component';

describe('DialogAddClientComponent', () => {
  let component: DialogAddClientComponent;
  let fixture: ComponentFixture<DialogAddClientComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
