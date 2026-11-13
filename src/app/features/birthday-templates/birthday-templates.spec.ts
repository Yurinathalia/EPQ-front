import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayTemplates } from './birthday-templates';

describe('BirthdayTemplates', () => {
  let component: BirthdayTemplates;
  let fixture: ComponentFixture<BirthdayTemplates>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BirthdayTemplates]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirthdayTemplates);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
