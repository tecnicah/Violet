import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TenancyManagementComponent } from './tenancy-management.component';

describe('TenancyManagementComponent', () => {
  let component: TenancyManagementComponent;
  let fixture: ComponentFixture<TenancyManagementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TenancyManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenancyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
