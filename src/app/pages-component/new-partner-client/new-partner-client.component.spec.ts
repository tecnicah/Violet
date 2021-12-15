import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewPartnerClientComponent } from './new-partner-client.component';

describe('NewPartnerClientComponent', () => {
  let component: NewPartnerClientComponent;
  let fixture: ComponentFixture<NewPartnerClientComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPartnerClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPartnerClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
