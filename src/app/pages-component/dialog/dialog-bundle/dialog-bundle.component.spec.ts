import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBundleComponent } from './dialog-bundle.component';

describe('DialogBundleComponent', () => {
  let component: DialogBundleComponent;
  let fixture: ComponentFixture<DialogBundleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBundleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBundleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
