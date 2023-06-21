import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddPaymenentInformationComponent } from './dialog-add-paymenent-information.component';

describe('DialogAddPaymenentInformationComponent', () => {
  let component: DialogAddPaymenentInformationComponent;
  let fixture: ComponentFixture<DialogAddPaymenentInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddPaymenentInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddPaymenentInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
