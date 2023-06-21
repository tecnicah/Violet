import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogClientDocuComponent } from './dialog-client-docu.component';

describe('DialogClientDocuComponent', () => {
  let component: DialogClientDocuComponent;
  let fixture: ComponentFixture<DialogClientDocuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogClientDocuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogClientDocuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
