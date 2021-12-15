import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogWireTransferComponent } from './dialog-wire-transfer.component';

describe('DialogWireTransferComponent', () => {
  let component: DialogWireTransferComponent;
  let fixture: ComponentFixture<DialogWireTransferComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogWireTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogWireTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
