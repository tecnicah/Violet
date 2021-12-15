import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExperienceSurveysComponent } from './experience-surveys.component';

describe('ExperienceSurveysComponent', () => {
  let component: ExperienceSurveysComponent;
  let fixture: ComponentFixture<ExperienceSurveysComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceSurveysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
