import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubNavLayout } from './sub-nav.layout';

describe('SubNavLayout', () => {
  let component: SubNavLayout;
  let fixture: ComponentFixture<SubNavLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubNavLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(SubNavLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
