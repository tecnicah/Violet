import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogCatalogNotificationTypeComponent } from './dialog-catalog-notification-type.component';

describe('DialogCatalogNotificationTypeComponent', () => {
  let component: DialogCatalogNotificationTypeComponent;
  let fixture: ComponentFixture<DialogCatalogNotificationTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCatalogNotificationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCatalogNotificationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
