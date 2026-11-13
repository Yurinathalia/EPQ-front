import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayTemplateForm } from './birthday-template-form';

describe('BirthdayTemplateForm', () => {
  let component: BirthdayTemplateForm;
  let fixture: ComponentFixture<BirthdayTemplateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BirthdayTemplateForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirthdayTemplateForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
