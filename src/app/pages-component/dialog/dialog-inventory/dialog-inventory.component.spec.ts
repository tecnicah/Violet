import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogInventoryComponent } from './dialog-inventory.component';

describe('DialogInventoryComponent', () => {
  let component: DialogInventoryComponent;
  let fixture: ComponentFixture<DialogInventoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
