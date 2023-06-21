import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsfContractComponent } from './lsf-contract.component';

describe('LsfContractComponent', () => {
  let component: LsfContractComponent;
  let fixture: ComponentFixture<LsfContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LsfContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LsfContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
