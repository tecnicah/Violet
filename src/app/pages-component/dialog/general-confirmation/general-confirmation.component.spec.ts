import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GeneralConfirmationComponent } from './general-confirmation.component';

describe('GeneralConfirmationComponent', () => {
  let component: GeneralConfirmationComponent;
  let fixture: ComponentFixture<GeneralConfirmationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
