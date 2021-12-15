import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherImmigrationComponent } from './other-immigration.component';

describe('OtherImmigrationComponent', () => {
  let component: OtherImmigrationComponent;
  let fixture: ComponentFixture<OtherImmigrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherImmigrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherImmigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
