import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogHousingSpecificationsComponent } from './dialog-housing-specifications.component';

describe('DialogHousingSpecificationsComponent', () => {
  let component: DialogHousingSpecificationsComponent;
  let fixture: ComponentFixture<DialogHousingSpecificationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogHousingSpecificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHousingSpecificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
