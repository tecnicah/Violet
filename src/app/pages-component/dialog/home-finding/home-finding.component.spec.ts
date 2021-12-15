import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeFindingComponent } from './home-finding.component';

describe('HomeFindingComponent', () => {
  let component: HomeFindingComponent;
  let fixture: ComponentFixture<HomeFindingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFindingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
