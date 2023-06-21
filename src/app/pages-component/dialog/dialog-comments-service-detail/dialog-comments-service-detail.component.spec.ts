import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCommentsServiceDetailComponent } from './dialog-comments-service-detail.component';

describe('DialogCommentsServiceDetailComponent', () => {
  let component: DialogCommentsServiceDetailComponent;
  let fixture: ComponentFixture<DialogCommentsServiceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCommentsServiceDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCommentsServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
