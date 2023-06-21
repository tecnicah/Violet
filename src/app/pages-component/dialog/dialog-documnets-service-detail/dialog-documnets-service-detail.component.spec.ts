import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDocumnetsServiceDetailComponent } from './dialog-documnets-service-detail.component';

describe('DialogDocumnetsServiceDetailComponent', () => {
  let component: DialogDocumnetsServiceDetailComponent;
  let fixture: ComponentFixture<DialogDocumnetsServiceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDocumnetsServiceDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDocumnetsServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
