import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogClientSdComponent } from './dialog-client-sd.component';

describe('DialogClientSdComponent', () => {
  let component: DialogClientSdComponent;
  let fixture: ComponentFixture<DialogClientSdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogClientSdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogClientSdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
