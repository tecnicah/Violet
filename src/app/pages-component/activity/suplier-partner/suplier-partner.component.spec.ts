import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SuplierPartnerComponent } from './suplier-partner.component';

describe('SuplierPartnerComponent', () => {
  let component: SuplierPartnerComponent;
  let fixture: ComponentFixture<SuplierPartnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuplierPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuplierPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
