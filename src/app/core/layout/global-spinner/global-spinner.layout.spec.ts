import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSpinnerLayout } from './global-spinner.layout';

describe('GlobalSpinnerLayout', () => {
  let component: GlobalSpinnerLayout;
  let fixture: ComponentFixture<GlobalSpinnerLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalSpinnerLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(GlobalSpinnerLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
