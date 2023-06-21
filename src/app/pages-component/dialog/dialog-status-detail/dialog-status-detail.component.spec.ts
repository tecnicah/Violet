import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStatusDetailComponent } from './dialog-status-detail.component';

describe('DialogStatusDetailComponent', () => {
  let component: DialogStatusDetailComponent;
  let fixture: ComponentFixture<DialogStatusDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogStatusDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStatusDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
