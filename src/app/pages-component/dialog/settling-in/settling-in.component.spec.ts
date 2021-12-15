import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SettlingInComponent } from './settling-in.component';

describe('SettlingInComponent', () => {
  let component: SettlingInComponent;
  let fixture: ComponentFixture<SettlingInComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SettlingInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettlingInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    console.log(component + 'prueba');
    console.log(fixture + 'prueba fixture');

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
