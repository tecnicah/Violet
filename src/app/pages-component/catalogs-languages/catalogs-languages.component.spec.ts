import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CatalogsLanguagesComponent } from './catalogs-languages.component';

describe('CatalogsLanguagesComponent', () => {
  let component: CatalogsLanguagesComponent;
  let fixture: ComponentFixture<CatalogsLanguagesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsLanguagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogsLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
