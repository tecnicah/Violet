import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogTenancyComponent } from './dialog-tenancy.component';

describe('DialogTenancyComponent', () => {
  let component: DialogTenancyComponent;
  let fixture: ComponentFixture<DialogTenancyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTenancyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTenancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
