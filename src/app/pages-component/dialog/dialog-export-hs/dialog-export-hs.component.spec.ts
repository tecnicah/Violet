import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExporthsComponent } from './dialog-export-hs.component';

describe('DialogStatusDetailComponent', () => {
  let component: DialogExporthsComponent;
  let fixture: ComponentFixture<DialogExporthsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExporthsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExporthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
