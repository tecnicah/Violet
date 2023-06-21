import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAssignamentComponent } from './chat-assignament.component';

describe('ChatAssignamentComponent', () => {
  let component: ChatAssignamentComponent;
  let fixture: ComponentFixture<ChatAssignamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatAssignamentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatAssignamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
