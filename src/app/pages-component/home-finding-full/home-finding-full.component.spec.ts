import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFindingFullComponent } from './home-finding-full.component';

describe('HomeFindingFullComponent', () => {
  let component: HomeFindingFullComponent;
  let fixture: ComponentFixture<HomeFindingFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeFindingFullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFindingFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
