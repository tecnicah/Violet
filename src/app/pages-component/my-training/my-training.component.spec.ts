import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyTrainingComponent } from './my-training.component';

describe('MyTrainingComponent', () => {
  let component: MyTrainingComponent;
  let fixture: ComponentFixture<MyTrainingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
