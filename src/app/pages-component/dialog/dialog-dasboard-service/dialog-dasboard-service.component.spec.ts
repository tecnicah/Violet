import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDasboardServiceComponent } from './dialog-dasboard-service.component';

describe('DialogDasboardServiceComponent', () => {
  let component: DialogDasboardServiceComponent;
  let fixture: ComponentFixture<DialogDasboardServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDasboardServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDasboardServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
