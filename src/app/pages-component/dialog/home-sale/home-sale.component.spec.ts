import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeSaleComponent } from './home-sale.component';

describe('HomeSaleComponent', () => {
  let component: HomeSaleComponent;
  let fixture: ComponentFixture<HomeSaleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
