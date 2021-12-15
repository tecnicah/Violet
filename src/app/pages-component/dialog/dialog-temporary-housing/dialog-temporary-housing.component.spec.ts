import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogTemporaryHousingComponent } from './dialog-temporary-housing.component';

describe('DialogTemporaryHousingComponent', () => {
  let component: DialogTemporaryHousingComponent;
  let fixture: ComponentFixture<DialogTemporaryHousingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTemporaryHousingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTemporaryHousingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
