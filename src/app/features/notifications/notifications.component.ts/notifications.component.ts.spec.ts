import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsComponentTs } from './notifications.component.ts';

describe('NotificationsComponentTs', () => {
  let component: NotificationsComponentTs;
  let fixture: ComponentFixture<NotificationsComponentTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationsComponentTs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsComponentTs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
