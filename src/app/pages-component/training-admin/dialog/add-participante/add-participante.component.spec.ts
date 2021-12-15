import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddParticipanteComponent } from './add-participante.component';

describe('AddParticipanteComponent', () => {
  let component: AddParticipanteComponent;
  let fixture: ComponentFixture<AddParticipanteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParticipanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
