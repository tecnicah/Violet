import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWireTransferProfileComponent } from './dialog-wire-transfer-profile.component';

describe('DialogWireTransferProfileComponent', () => {
  let component: DialogWireTransferProfileComponent;
  let fixture: ComponentFixture<DialogWireTransferProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogWireTransferProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogWireTransferProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
