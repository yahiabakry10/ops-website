import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryCardInfoComponent } from './secondary-card-info.component';

describe('SecondaryCardInfoComponent', () => {
  let component: SecondaryCardInfoComponent;
  let fixture: ComponentFixture<SecondaryCardInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondaryCardInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondaryCardInfoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
