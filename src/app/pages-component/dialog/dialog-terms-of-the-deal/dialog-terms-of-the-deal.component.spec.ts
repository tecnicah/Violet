import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogTermsOfTheDealComponent } from './dialog-terms-of-the-deal.component';

describe('DialogTermsOfTheDealComponent', () => {
  let component: DialogTermsOfTheDealComponent;
  let fixture: ComponentFixture<DialogTermsOfTheDealComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTermsOfTheDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTermsOfTheDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
