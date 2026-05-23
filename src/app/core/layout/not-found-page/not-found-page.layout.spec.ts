import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundPageLayout } from './not-found-page.layout';

describe('NotFoundPageLayout', () => {
  let component: NotFoundPageLayout;
  let fixture: ComponentFixture<NotFoundPageLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundPageLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundPageLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
