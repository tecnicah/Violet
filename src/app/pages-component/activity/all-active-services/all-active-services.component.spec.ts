import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllActiveServicesComponent } from './all-active-services.component';

describe('AllActiveServicesComponent', () => {
  let component: AllActiveServicesComponent;
  let fixture: ComponentFixture<AllActiveServicesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllActiveServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllActiveServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
