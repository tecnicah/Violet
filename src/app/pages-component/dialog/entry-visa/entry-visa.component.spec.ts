import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EntryVisaComponent } from './entry-visa.component';

describe('EntryVisaComponent', () => {
  let component: EntryVisaComponent;
  let fixture: ComponentFixture<EntryVisaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryVisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryVisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
