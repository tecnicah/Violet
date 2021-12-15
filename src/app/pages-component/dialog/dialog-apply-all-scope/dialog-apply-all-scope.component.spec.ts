import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogApplyAllScopeComponent } from './dialog-apply-all-scope.component';

describe('DialogApplyAllScopeComponent', () => {
  let component: DialogApplyAllScopeComponent;
  let fixture: ComponentFixture<DialogApplyAllScopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogApplyAllScopeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogApplyAllScopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
