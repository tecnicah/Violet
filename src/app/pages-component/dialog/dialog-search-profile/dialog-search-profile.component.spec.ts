import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSearchProfileComponent } from './dialog-search-profile.component';

describe('DialogSearchProfileComponent', () => {
  let component: DialogSearchProfileComponent;
  let fixture: ComponentFixture<DialogSearchProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSearchProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSearchProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
