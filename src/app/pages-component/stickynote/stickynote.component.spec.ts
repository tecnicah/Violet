import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StickynoteComponent } from './stickynote.component';

describe('StickynoteComponent', () => {
  let component: StickynoteComponent;
  let fixture: ComponentFixture<StickynoteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StickynoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StickynoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
