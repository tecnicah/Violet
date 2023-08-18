import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTimeExtensionsComponent } from './dialog-time-extensions.component';

describe('DialogTimeExtensionsComponent', () => {
  let component: DialogTimeExtensionsComponent;
  let fixture: ComponentFixture<DialogTimeExtensionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTimeExtensionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTimeExtensionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
