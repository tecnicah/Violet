import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogLocalDocumentationComponent } from './dialog-local-documentation.component';

describe('DialogLocalDocumentationComponent', () => {
  let component: DialogLocalDocumentationComponent;
  let fixture: ComponentFixture<DialogLocalDocumentationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogLocalDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLocalDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
