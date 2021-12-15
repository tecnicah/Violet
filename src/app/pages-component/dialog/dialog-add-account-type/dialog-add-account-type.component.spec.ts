import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddAccountTypeComponent } from './dialog-add-account-type.component';

describe('DialogAddAccountTypeComponent', () => {
  let component: DialogAddAccountTypeComponent;
  let fixture: ComponentFixture<DialogAddAccountTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddAccountTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddAccountTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
