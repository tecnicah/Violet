import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogIncludedInRentComponent } from './dialog-included-in-rent.component';

describe('DialogIncludedInRentComponent', () => {
  let component: DialogIncludedInRentComponent;
  let fixture: ComponentFixture<DialogIncludedInRentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogIncludedInRentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogIncludedInRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
