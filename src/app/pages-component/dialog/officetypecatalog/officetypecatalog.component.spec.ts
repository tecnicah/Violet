import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficetypecatalogComponent } from './officetypecatalog.component';

describe('OfficetypecatalogComponent', () => {
  let component: OfficetypecatalogComponent;
  let fixture: ComponentFixture<OfficetypecatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficetypecatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficetypecatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
