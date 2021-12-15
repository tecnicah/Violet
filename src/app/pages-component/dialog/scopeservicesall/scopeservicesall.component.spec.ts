import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeservicesallComponent } from './scopeservicesall.component';

describe('ScopeservicesallComponent', () => {
  let component: ScopeservicesallComponent;
  let fixture: ComponentFixture<ScopeservicesallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScopeservicesallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScopeservicesallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
