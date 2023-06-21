import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardServiceDetaillComponent } from './card-service-detaill.component';

describe('CardServiceDetaillComponent', () => {
  let component: CardServiceDetaillComponent;
  let fixture: ComponentFixture<CardServiceDetaillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardServiceDetaillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardServiceDetaillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
