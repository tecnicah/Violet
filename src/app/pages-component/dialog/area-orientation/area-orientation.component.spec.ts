import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AreaOrientationComponent } from './area-orientation.component';

describe('AreaOrientationComponent', () => {
  let component: AreaOrientationComponent;
  let fixture: ComponentFixture<AreaOrientationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaOrientationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaOrientationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
