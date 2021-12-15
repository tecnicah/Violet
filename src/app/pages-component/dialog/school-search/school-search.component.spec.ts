import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SchoolSearchComponent } from './school-search.component';

describe('SchoolSearchComponent', () => {
  let component: SchoolSearchComponent;
  let fixture: ComponentFixture<SchoolSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
