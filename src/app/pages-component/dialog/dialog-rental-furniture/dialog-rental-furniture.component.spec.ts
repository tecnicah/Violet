import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogRentalFurnitureComponent } from './dialog-rental-furniture.component';

describe('DialogRentalFurnitureComponent', () => {
  let component: DialogRentalFurnitureComponent;
  let fixture: ComponentFixture<DialogRentalFurnitureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRentalFurnitureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRentalFurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
