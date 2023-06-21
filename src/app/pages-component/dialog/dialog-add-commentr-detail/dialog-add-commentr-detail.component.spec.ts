import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddCommentrDetailComponent } from './dialog-add-commentr-detail.component';

describe('DialogAddCommentrDetailComponent', () => {
  let component: DialogAddCommentrDetailComponent;
  let fixture: ComponentFixture<DialogAddCommentrDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddCommentrDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddCommentrDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
